#!/bin/bash
# Based on https://github.com/discordjs/discord.js-site/blob/master/deploy/deploy.sh

set -e

if [ -n "$TRAVIS_TAG" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "Not building for a non branch push - building without deploying."
  yarn docs
  exit 0
fi

echo -e "Building for a branch push - building and deploying."

REPO=$(git config remote.origin.url)
SHA=$(git rev-parse --verify HEAD)

# Run the build
yarn docs
NODE_ENV=production yarn build:browser

# Docs
TARGET_BRANCH="docs"
git clone $REPO out -b $TARGET_BRANCH

yarn docs

mv docs/docs.json out/${TRAVIS_BRANCH//\/|\./_/}.json

cd out
git add --all .
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Docs build: ${SHA}" || true
git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH

# Clean-up
cd ..
rm -rf out

# Do the thing once more for webpack
TARGET_BRANCH="webpack"
git clone $REPO out -b $TARGET_BRANCH
mv webpack/canvasconstructor.min.js out/canvasconstructor.$SOURCE.min.js

# Commit and push
cd out
git add --all .
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Webpack build: ${SHA}" || true
git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH

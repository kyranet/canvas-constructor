#!/bin/bash
# Based on https://github.com/discordjs/discord.js-site/blob/master/deploy/deploy.sh
set -e

DONT_COMMIT=false

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "\e[36m\e[1mBuild triggered for PR #${TRAVIS_PULL_REQUEST} to branch \"${TRAVIS_BRANCH}\" - not commiting"
  SOURCE_TYPE="pr"
  DONT_COMMIT=true
elif [ -n "$TRAVIS_TAG" ]; then
  echo -e "\e[36m\e[1mBuild triggered for tag \"${TRAVIS_TAG}\"."
  SOURCE=$TRAVIS_TAG
  SOURCE_TYPE="tag"
else
  echo -e "\e[36m\e[1mBuild triggered for branch \"${TRAVIS_BRANCH}\"."
  SOURCE=$TRAVIS_BRANCH
  SOURCE_TYPE="branch"
fi

if [ $DONT_COMMIT == true ]; then
  echo -e "\e[36m\e[1mNot commiting - exiting early"
  exit 0
fi

echo -e "Building for a branch push - building and deploying."

# Run the build
npm run docs
NODE_ENV=production npm run build:browser

REPO=$(git config remote.origin.url)
SHA=$(git rev-parse --verify HEAD)

# Docs
TARGET_BRANCH="docs"
git clone $REPO out -b $TARGET_BRANCH

npm run docs

mv docs/docs.json out/${TRAVIS_BRANCH//\//_}.json

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
mv webpack/discord.min.js out/discord.$SOURCE.min.js

# Commit and push
cd out
git add --all .
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Webpack build: ${SHA}" || true
git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH

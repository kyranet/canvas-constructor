#!/bin/bash
# Based on https://github.com/discordjs/discord.js-site/blob/master/deploy/deploy.sh

set -e

# For revert or dependabot branches, do nothing
if [[ "$TRAVIS_BRANCH" == revert-* ]] || [[ "$TRAVIS_BRANCH" == dependabot/* ]]; then
  echo -e "\e[36m\e[1mBuild triggered for reversion branch \"${TRAVIS_BRANCH}\" - doing nothing."
  exit 0
fi

# For pull requests, do nothing
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "Not building for a non branch push - building without deploying."
  yarn docs
  exit 0
fi

# If it's not a tag (and not a pull request push)
if [ -z $TRAVIS_TAG ]; then
  echo -e "Building for a branch push - building and deploying."

  SOURCE="${TRAVIS_BRANCH//\/|\./_/}"
  REPO=$(git config remote.origin.url)
  SHA=$(git rev-parse --verify HEAD)

  # Docs
  TARGET_BRANCH="docs"
  git clone $REPO out -b $TARGET_BRANCH
  yarn docs
  mv docs/docs.json out/${SOURCE}.json

  cd out
  git add --all .
  git config user.name "Travis CI"
  git config user.email "$COMMIT_AUTHOR_EMAIL"
  git commit -m "Docs build: ${SHA}" || true
  git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH
fi

# Only push to webpack if it's a release or master branch
if [ -n "$TRAVIS_TAG" ] || [ $TRAVIS_BRANCH == "master" ]; then
  # Clean-up
  cd ..
  rm -rf out

  # Do the thing once more for webpack
  TARGET_BRANCH="webpack"
  if [ -n "$TRAVIS_TAG" ]; then IDENTIFIER="$TRAVIS_TAG"; else IDENTIFIER="$TRAVIS_BRANCH"; fi
  git clone $REPO out -b $TARGET_BRANCH
  yarn build:browser
  mv webpack/canvasconstructor.min.js out/canvasconstructor.$IDENTIFIER.min.js

  # Commit and push
  cd out
  git add --all .
  git config user.name "Travis CI"
  git config user.email "$COMMIT_AUTHOR_EMAIL"
  git commit -m "Webpack build: ${SHA}" || true
  git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH
fi

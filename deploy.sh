#!/usr/bin/env sh
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:zwelc/estimator.git main:gh-pages
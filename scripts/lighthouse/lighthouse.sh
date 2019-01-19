#!/usr/bin/env bash

[ -f ~/.bashrc ] && . ~/.bashrc

# Changing path to project master
cd ../repository

# Install NPM packages
npm install

# Run lighthouse node script
npm run lighthouse

# Deploy to AWS s3 using aws-cli
echo "Deploying Lighthouse files to S3 for reference"
aws s3 sync tests/lighthouse/ s3://$S3_BUCKET_PATH --acl=public-read
echo " >> Visit report at http://$S3_BUCKET_PATH.s3-website-us-east-1.amazonaws.com"

npm run lighthouse-test

#!/usr/bin/env bash

[ -f ~/.bashrc ] && . ~/.bashrc

# Changing path to project master
cd ../repository

# Install node packages
echo -e "\e[33m1. Running YARN install"
yarn install --no-progress

# Run the build task
echo -e "\e[33m2. Running YARN build command"
if [ -z "$BUILD_COMMAND" ]
then
    yarn build
else
    yarn $BUILD_COMMAND
fi


# Deploy to AWS s3 using aws-cli
echo -e "\e[33m3. Deploying files to S3 for reference"
aws s3 sync $DIRECTORY/ s3://$S3_BUCKET_PATH --acl=public-read

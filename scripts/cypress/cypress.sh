#!/usr/bin/env bash

[ -f ~/.bashrc ] && . ~/.bashrc

# Changing path to project master
cd ../repository

# Install NPM packages
echo -e "\e[33m1. Running YARN install"
yarn install --no-progress

# Run the test
echo -e "\e[33m2. Running NPM build command"
yarn test

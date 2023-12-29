#!/bin/sh
echo "Install dependencies for BackEnd..."

npm install --global yarn

yarn install

echo "Start BackEnd..."

yarn run start:dev

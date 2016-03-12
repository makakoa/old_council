#!/bin/bash

NODE_ENV='production' webpack
cp public/* platform/cordova/www/
cd platform/cordova
cordova build ios

#!/bin/bash

webpack
cp public/* platform/cordova/www/
cd platform/cordova
cordova build ios

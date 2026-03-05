#!/bin/bash

rm -rf build function.zip
mkdir build
pip install -r requirements.txt -t build --no-cache-dir
cp -r app build/
cd build
zip -r ../function.zip .
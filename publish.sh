#!/bin/bash

mv ./build ./assets
mv ./assets ./nodeserver


printf "\e[1;31m 发布完成，node ./nodeserver/app.js试试吧 ! \n"

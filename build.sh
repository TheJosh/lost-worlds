#!/bin/bash

# Deps:
# apt-get install closure-compiler advancecomp pngcrush


mkdir -p build
rm build/*

cat \
	src/globals.js \
	src/init_map.js \
	src/engine/*.js \
	src/entities/*.js \
	src/main.js \
	> build/all.js

closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --jscomp_off globalThis build/all.js >build/a.js
rm build/all.js

echo "<title>Lost Worlds</title>" >build/index.html
echo "<meta charset=\"UTF-8\">" >>build/index.html
echo "<meta name=viewport content=\"width=device-width,user-scalable=no\">" >>build/index.html
echo "<style>body{margin:0;overflow:hidden}</style>" >>build/index.html
echo "<canvas id=c></canvas>" >>build/index.html
echo "<script src=a.js></script>" >>build/index.html

pngcrush -q -brute src/p.png build/p.png
advpng -z -i 100 -4 build/*.png

cp src/*.gif build

cp src/*.mp3 build

rm -f build.zip

advzip -a -4 -i 100 build.zip build/*

SIZE=$( ls -al build.zip | cut -d ' ' -f 5 )
REMAIN=$( expr 13312 - $SIZE )

echo "Used:   $SIZE bytes"
echo "Spare:  $REMAIN bytes"

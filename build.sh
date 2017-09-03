#!/bin/bash

# Deps:
# apt-get install closure-compiler advancecomp pngcrush


mkdir -p build

cat \
	src/globals.js \
	src/init_map.js \
	src/render/*.js \
	src/engine/*.js \
	src/entities/*.js \
	src/main.js \
	> build/all.js

closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS build/all.js >build/a.js
rm build/all.js

echo "<title>Lost Worlds</title><meta charset=\"UTF-8\"><style>body{margin:0;overflow:hidden}</style><canvas id=c></canvas><script src=a.js></script>" \
	>build/index.html

pngcrush -q -brute src/p.png build/p.png

cp src/*.gif build

rm -f build.zip

advzip -a -4 -i 100 build.zip build/*

SIZE=$( ls -al build.zip | cut -d ' ' -f 5 )

echo "Total size: $SIZE bytes"

if [ $SIZE -gt 13312 ]; then
	echo "TOO BIG!"
fi

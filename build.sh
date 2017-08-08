#!/bin/bash

# Deps:
# apt-get install closure-compiler


mkdir -p tmp

closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS source.js >tmp/a.js

sed 's/source.js/a.js/' index.html >tmp/index.html

rm build.zip

echo "Would you like 50 more bytes? Remove this comment!" >archcomment
zip -z -9 -q -j build.zip tmp/* <archcomment
rm archcomment

SIZE=$( ls -al build.zip | cut -d ' ' -f 5 )

rm -r tmp

echo "Total size: $SIZE bytes"

if [ $SIZE -gt 13312 ]; then
	echo "TOO BIG!"
fi


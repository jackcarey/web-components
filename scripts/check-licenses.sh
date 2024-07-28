#!/bin/bash

# Find all folders under packages/
# and check that each one has a LICENSE.md file
# If any folder is missing a LICENSE.md file, the script will exit with a non-zero status code
find packages -mindepth 1 -maxdepth 1 -type d | while read -r dir; do
  if [ ! -f "$dir/LICENSE.md" ]; then
    echo "Missing LICENSE.md file in $dir"
    exit 1
  fi
done
#!/bin/bash

# Find all folders under packages/
# and check if they have a DOCUMENTATION.md file
# If any folder is missing a DOCUMENTATION.md file, the script will exit with a non-zero status code
find packages -mindepth 1 -maxdepth 1 -type d | while read -r dir; do
  if [ ! -f "$dir/DOCUMENTATION.md" ]; then
    echo "Missing DOCUMENTATION.md file in $dir"
    exit 1
  fi
done
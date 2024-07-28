#!/bin/bash

# Find all folders under packages/
# and check if they have a DOCUMENTATION.md file
find packages/ -type d -exec test -e "{}/LICENSE.md" \; -print || exit 1
echo "bumping package patch versions"
directories=$(find "$(git rev-parse --show-toplevel)/packages" -name 'package.json' -not -path '*/node_modules/*' -type f -printf '%h\n' | sort -u)
for dir in $directories; do
    cd $dir
    changes=$(git diff $(git merge-base origin/main HEAD))
    if [ -z "$changes" ]; then
        echo "No changes in $dir. Skipping version bump."
    else
        echo "bumping $dir"
        npm version patch -m "Bump package patch version"
    fi
    cd ..
done

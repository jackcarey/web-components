echo "bumping package patch versions"
for dir in $(find "$(git rev-parse --show-toplevel)/packages" -name 'package.json' -not -path '*/node_modules/*' -type f -printf '%h\n' | sort -u)
    do
        echo "bumping $dir"
        cd $dir
        npm version patch -m "Bump package patch version"
        cd ..
    done
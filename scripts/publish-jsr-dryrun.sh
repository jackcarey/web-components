for dir in packages/*; do
    if [ -d "$dir" ]; then
        cd "$dir"
        npx jsr publish --allow-dirty --dry-run
        cd ..
    fi
done

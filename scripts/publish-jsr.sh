for dir in packages/*; do
    if [ -d "$dir" ]; then
        cd "$dir"
        npx jsr publish --allow-dirty
        cd ..
    fi
done

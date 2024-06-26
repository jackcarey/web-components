# Find all relevant package.json files in the packages directory that are not in node_modules
directories=$(find "$(git rev-parse --show-toplevel)/packages" -name 'package.json' -not -path '*/node_modules/*' -type f -printf '%h\n' | sort -u)
currentBranch=$(git rev-parse --abbrev-ref HEAD)
if [ "$currentBranch" = "main" ]; then
    echo "Bumping package patch versions based on changes against last common commit..."
else
    echo "Bumping package patch versions based on changes against main branch..."
fi
for dir in $directories; do
    cd $dir
    ancestor=$(git merge-base origin/main HEAD)
    branchChanges=$(git diff $ancestor origin/main -- $dir)
    lastCommitChanges=$(git diff $() -- $dir)
    if [ "$currentBranch" = "main" ]; then
        if [ -z "$lastCommitChanges" ]; then
            echo "No changes in $dir. Skipping version bump."
        else
            echo "bumping $dir"
            npm version patch -m "Bump package patch version"
        fi
    else
        if [ -z "$branchChanges" ]; then
            echo "No changes in $dir. Skipping version bump."
        else
            echo "bumping $dir"
            npm version patch -m "Bump package patch version"
        fi
    fi
    cd ..
done

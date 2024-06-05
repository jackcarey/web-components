if [ -f CODEOWNERS ]; then
    echo "CODEOWNERS file exists"
elif [ -f .github/CODEOWNERS ]; then
    echo "CODEOWNERS file exists in .github folder"
else
    echo "CODEOWNERS file does not exist"
    exit 1
fi
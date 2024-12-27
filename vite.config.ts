export default {
    build: {
        rollupOptions: {
            external: ["**/**/DOCUMENTATION.md", "**/README.md"],
            output: {
                assetFileNames: '[name].[ext]', // Preserve original file names
            }
        },
    },
};

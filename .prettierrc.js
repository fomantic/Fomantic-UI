module.exports = {
    tabWidth: 4,
    overrides: [
        {
            files: ['*.less', '*.overrides', '*.variables'],
            options: {
                parser: 'less',
                printWidth: Infinity,
            },
        },
    ],
};

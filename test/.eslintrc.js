module.exports = {
    extends: [
        'plugin:jest/recommended',
    ],
    settings: {
        jest: {
            version: 29,
        },
    },
    rules: {
        'jest/no-disabled-tests': 'off',

        // TODO rare errors
        'jest/no-jasmine-globals': 'off',
        'jest/no-test-prefixes': 'off',
    },
    globals: {
        jQuery: false,
        $: true,
        dump: true,
        HTTP: true,
        jasmine: true,
        moduleTests: true,
        sandbox: true,
        Tinytest: true,
    },
};

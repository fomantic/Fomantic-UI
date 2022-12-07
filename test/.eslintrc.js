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

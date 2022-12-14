const
    browserslist = require('browserslist'),
    console = require('better-console'),
    config  = require('./user'),
    release = require('./project/release')
;

let defaultBrowsers = browserslist(browserslist.defaults);
let userBrowsers = browserslist();
let hasBrowserslistConfig = JSON.stringify(defaultBrowsers) !== JSON.stringify(userBrowsers);

let overrideBrowserslist = hasBrowserslistConfig ? undefined : [
    'last 2 versions',
    '> 1%',
    'opera 12.1',
    'bb 10',
    'android 4',
];

// Node 12 does not support ??, so a little polyfill
let nullish = (value, fallback) => (value !== undefined && value !== null ? value : fallback);

module.exports = {

    banner: nullish(config.banner, release.banner),

    log: {
        created: function (file) {
            return 'Created: ' + file;
        },
        modified: function (file) {
            return 'Modified: ' + file;
        },
    },

    filenames: {
        concatenatedCSS: 'semantic.css',
        concatenatedJS: 'semantic.js',
        concatenatedMinifiedCSS: 'semantic.min.css',
        concatenatedMinifiedJS: 'semantic.min.js',
        concatenatedRTLCSS: 'semantic.rtl.css',
        concatenatedMinifiedRTLCSS: 'semantic.rtl.min.css',
    },

    regExp: {

        comments: {
            // remove all component headers in concatenated file
            header: {
                in: /\/\*!(?:(?!\/\*).)*# Fomantic-UI \d+\.\d+\.(?:(?!\/\*).)*MIT license(?:(?!\/\*).)*\*\/\n?/gs,
                out: '',
            },

            // remove all comments from config files (.variable)
            variables: {
                in: /(\/\*[\S\s]+?\*\/+)[\S\s]+?\/\* End Config \*\//,
                out: '$1',
            },

            // add version to first comment
            license: {
                in: /(^\/\*[\S\s]+)(# Fomantic-UI )([\S\s]+?\*\/)/,
                out: '$1$2' + release.version + ' $3',
            },

            // adds uniform spacing around comments
            large: {
                in: /(\/\*{4}[\S\s]+?\*\/)/gm,
                out: '\n\n$1\n',
            },
            small: {
                in: /(\/\*---[\S\s]+?\*\/)/gm,
                out: '\n$1\n',
            },
            tiny: {
                in: /(\/\* [\S\s]+? \*\/)/gm,
                out: '\n$1',
            },
        },

        theme: /.*(\/|\\)themes(\/|\\).*?(?=(\/|\\))/gm,

    },

    settings: {

        /* Remove Files in Clean */
        del: {
            silent: true,
        },

        concatCSS: {
            rebaseUrls: false,
        },

        /* Comment Banners */
        header: {
            year: nullish(config.header.year, new Date().getFullYear()),
            title: nullish(config.header.title, release.title),
            version: nullish(config.header.version, release.version),
            repository: nullish(config.header.repository, release.repository),
            url: nullish(config.header.url, release.url),
        },

        plumber: {
            less: {
                errorHandler: function (error) {
                    let
                        regExp = {
                            variable: /@(\S.*?)\s/,
                            theme: /themes[/\\]+(.*?)[/\\].*/,
                            element: /[/\\]([^*/\\]*)\.overrides/,
                        },
                        theme,
                        element
                    ;
                    if (error && error.filename && /theme.less/.test(error.filename)) {
                        if (error.line === 9) {
                            element = regExp.variable.exec(error.message)[1];
                            if (element) {
                                console.error('Missing theme.config value for', element);
                            }
                            console.error('Most likely new UI was added in an update. You will need to add missing elements from theme.config.example');
                        } else if (error.line === 84) {
                            element = regExp.element.exec(error.message)[1];
                            theme = regExp.theme.exec(error.message)[1];
                            console.error(theme + ' is not an available theme for ' + element);
                        } else {
                            console.error(error);
                        }
                    } else {
                        throw new Error(error);
                    }
                    this.emit('end');
                },
            },
        },

        /* What Browsers to Prefix */
        prefix: {
            overrideBrowserslist: overrideBrowserslist,
        },

        /* File Renames */
        rename: {
            minJS: { extname: '.min.js' },
            minCSS: { extname: '.min.css' },
            rtlCSS: { extname: '.rtl.css' },
            rtlMinCSS: { extname: '.rtl.min.css' },
        },

        /* Minified CSS Concat */
        minify: {
            level: {
                1: {
                    inline: false,
                },
            },
        },

        /* Minified JS Settings */
        uglify: {
            mangle: true,
            output: {
                comments: 'some',
            },
        },

        /* Minified Concat CSS Settings */
        concatMinify: {
            level: {
                1: {
                    inline: false,
                    specialComments: false,
                },
            },
        },

        /* Minified Concat JS */
        concatUglify: {
            mangle: true,
            output: {
                comments: 'some',
            },
        },

    },
};

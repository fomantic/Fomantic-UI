let
    where = 'client' // Adds files only to the client
;

Package.describe({
    name: 'fomantic:ui-css',
    summary: 'Fomantic UI - CSS only distribution',
    version: '{version}',
    git: 'git://github.com/fomantic/Fomantic-UI-CSS.git',
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');

    api.use('jquery', 'client');

    api.addAssets([
        // icons
        'themes/default/assets/fonts/icons.woff',
        'themes/default/assets/fonts/icons.woff2',
    ], 'client');

    api.addFiles([
        // release
        'semantic.css',
        'semantic.js',
    ], 'client');
});

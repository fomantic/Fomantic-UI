Package.describe({
    name: 'fomantic:ui-{component}',
    summary: 'Fomantic UI - {Component}: Single component release',
    version: '{version}',
    git: 'git://github.com/fomantic/UI-{Component}.git',
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');
    api.addFiles([
        { files: files },
    ], 'client');
});

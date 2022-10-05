var
  where = 'client' // Adds files only to the client
;

Package.describe({
  name    : 'semantic:ui',
  summary : 'Fomantic UI - LESS only distribution',
  version : '{version}',
  git     : 'git://github.com/fomantic/Fomantic-UI-LESS.git',
});

Package.onUse(function(api) {

  api.versionsFrom('1.0');
  api.use('less', 'client');

  api.addFiles([
    {files}
  ], 'client');

});

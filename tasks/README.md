## Tasks

* Watch - Compile only changed files from source
* Build - Build all files from source
* Version - Output version number
* Install - Run Installer to Set-up Paths

## How to use

These tasks can be imported into your own gulpfile allowing you to avoid using Fomantic's build tools

```javascript
const watch = require('path/to/fomantic/tasks/watch');
gulp.task('watch ui', watch);
```

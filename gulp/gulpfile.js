var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
gulp.task('webserver', function() {
  gulp.src('../../web_components')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
     // host:"0.0.0.0",
     // port:"3000"
    }));
});
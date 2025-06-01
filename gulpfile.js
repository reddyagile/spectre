const gulp = require("gulp");
const pug = require('gulp-pug');
// const { parallel } = require("gulp"); // Not needed if only docs_pug and watch_pug are left and run sequentially

// Task to compile Pug files for documentation
function docs_pug() {
  return gulp
    .src('docs/src/**/!(_)*.pug') // Process all .pug files except those starting with _
    .pipe(pug({
      pretty: true // Output readable HTML
    }))
    .pipe(gulp.dest('./docs/')); // Output to docs root (maintaining folder structure from src)
}
exports.docs_pug = docs_pug;

// Optional: a watch task just for Pug
function watch_pug() {
  // Watch all .pug files in docs/src and its subdirectories
  gulp.watch('./docs/src/**/*.pug', docs_pug);
}
exports.watch_pug = watch_pug;

// Set docs_pug as the default task if Gulp is run without arguments
exports.default = docs_pug;

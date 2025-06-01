const gulp = require("gulp");
const { parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass')); // Corrected SASS init
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs');
const path = require('path');
const merge = require('merge-stream');

const THEME_BASE_FILE = 'spectre.scss'; // The main file that imports all components

function build() {
  const themes = ['spectre', 'fluent', 'shadcn'];
  const streams = themes.map(theme => {
    const tempThemeFile = path.join('src', `main-${theme}.scss`);
    const baseFileContent = fs.readFileSync(path.join('src', THEME_BASE_FILE), 'utf8');
    // Assuming the variable import in THEME_BASE_FILE is specifically for spectre,
    // or a generic one that needs replacement. For now, it's "themes/spectre/variables".
    const themeSpecificContent = baseFileContent.replace('@import "themes/spectre/variables";', `@import "themes/${theme}/variables";`);
    fs.writeFileSync(tempThemeFile, themeSpecificContent);

    return gulp.src(tempThemeFile, { allowEmpty: true })
      .pipe(sass({ outputStyle: 'expanded', precision: 10 }) // Corrected outputStyle
        .on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(csscomb())
      .pipe(rename({ basename: theme }))
      .pipe(gulp.dest('./dist'))
      .pipe(cleancss())
      .pipe(rename({ basename: theme, suffix: '.min' }))
      .pipe(gulp.dest('./dist'))
      .on('end', () => {
        if (fs.existsSync(tempThemeFile)) {
          fs.unlinkSync(tempThemeFile);
        }
      });
  });
  return merge(streams);
}

function docs_css() {
  return gulp
    .src(['./src/*.scss', './docs/src/scss/*.scss']) // This will likely pick up temp files if not careful, but also main spectre files
    .pipe(sass({outputStyle: 'expanded', precision: 10}) // Corrected outputStyle
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./docs/dist'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./docs/dist'));
}

function docs_pug() {
  return gulp
    .src('docs/src/**/!(_)*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./docs/'));
}

function docs_js() {
  return gulp.src('docs/src/js/**/*.js')
    .pipe(gulp.dest('docs/dist/js'));
}

function watch() {
  // Watch for main SCSS changes (excluding docs SCSS)
  gulp.watch(['./src/**/*.scss', '!./docs/src/scss/**/*.scss'], build);
  // Watch for docs SCSS changes
  gulp.watch('./docs/src/scss/**/*.scss', docs_css);
  // Watch for docs Pug changes
  gulp.watch('./docs/src/pug/**/*.pug', docs_pug);
  // Watch for docs JS changes
  gulp.watch('./docs/src/js/**/*.js', docs_js);
}

exports.watch = watch;
exports.build = build;
exports.docs = parallel(docs_pug, docs_css, docs_js);
exports.default = build;

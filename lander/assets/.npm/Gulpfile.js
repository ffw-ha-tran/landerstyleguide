/*jslint indent: 2 */
'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  scsslint = require('gulp-scss-lint'),
  jshint = require('gulp-jshint'),
  shell = require('gulp-shell'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  src = {
    scss: '../sass/**/*.scss',
    css: '../css',
    html: '../../index.html',
    htmlFile: '../components/**/*.html',
    javascript: '../js/*.js',
    cssFile: '../css/*.css',
  };

// Task for local, static development.
gulp.task('local-development', ['sass-dev'], function () {
  browserSync({
    server: {
      baseDir: "../../",
    }
  });

  gulp.watch(src.scss, ['sass-dev']);
  gulp.watch(src.javascript, reload);
  gulp.watch(src.cssFile, reload);
  gulp.watch(src.htmlFile, reload);
  gulp.watch(src.html, reload);
});

// Sass watch, compile css when sass is changed.
gulp.task('sass-watch', ['sass-dev'], function () {
  gulp.watch(src.scss, ['sass-dev']);
});

// SCSS Lint.
gulp.task('scss-lint', function () {
  return gulp.src(src.scss)
    .pipe(
      scsslint({
        'config': 'scss-lint.yml',
      })
    );
});

// Task for compiling sass in development mode with all features enabled.
gulp.task('sass-dev', function () {
  gulp.src('../sass/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({browsers: ['safari >= 8', 'last 3 versions', '> 2%']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.css))
});

// Javascript Lint.
gulp.task('js-lint', function () {
  return gulp.src(src.javascript)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Default task.
gulp.task('default', ['local-development']);

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('inspect', function(){
    return gulp.src(['./**/*.js',
    '!node_modules/**/*.js',
    '!bower_components/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('default', ['inspect']);

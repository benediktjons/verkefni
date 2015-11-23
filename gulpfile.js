'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('inspect', function(){
    return gulp.src(['./**/*.js',
    '!node_modules/**/*.js',
    '!bower_components/**/*.js',
    '!public/js/datepicker.js',
    '!public/js/bootstrap-clockpicker.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
  gulp.src('./lib/*.test.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['inspect','test']);

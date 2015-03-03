'use strict';

var gulp = require('gulp');
var fs = require('fs');
var jshint = require('gulp-jshint');
var jsxcs = require('gulp-jsxcs');
var rimraf = require('gulp-rimraf');
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');

var buildDevCfg = require('./webpack.dev-config');

var paths = {
  front: ['app/**/*.{js,jsx}'],
  back: ['server/**/*.js']
};

//to read in json files
var _jsonCfg = function(name) {
  var raw = fs.readFileSync(name).toString();
  return JSON.parse(raw.replace(/\/\/.*\n/g, ''));
};

gulp.task('jshint', function() {
  return gulp
    .src([].concat(paths.front, paths.back, 'gulpfile.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
  return gulp
    .src([].concat(paths.front, paths.back, 'gulpfile.js'))
    .pipe(jsxcs(_jsonCfg('.jscsrc')));
});

gulp.task('clean', function() {
  return gulp
    .src('build', {read: false})
    .pipe(rimraf());
});

gulp.task('copy', function() {
  return gulp
    .src('app/index.html')
    .pipe(gulp.dest('build/index.html'));
});

gulp.task('build:dev', function() {
  return gulp
    .src('app/app.js')
    .pipe(webpack(buildDevCfg))
    .pipe(gulp.dest('build'));
});

gulp.task('server', function() {
  nodemon({
    script: 'server/server.js',
    ext: 'js,jsx',
    watch: [
      'server',
      'app'
    ]
  });
});

gulp.task('default', ['jshint', 'jscs', 'clean', 'copy', 'build:dev', 'server']);

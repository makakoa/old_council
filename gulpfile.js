var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsxcs = require('gulp-jsxcs');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');

var buildDevCfg = require('./webpack.dev-config');

var paths = {
  front: ['app/**/*.{js,jsx}'],
  back: ['server/**/*.js']
};

gulp.task('clean', function() {
  return gulp
    .src('build', {read: false})
    .pipe(clean());
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
    watch: [
      'server',
      'app'
    ]
  });
});

gulp.task('default', ['clean', 'build:dev', 'server']);

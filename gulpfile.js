'use strict';

var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var size         = require('gulp-size');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;

// IMAGES
gulp.task('images', function() {
    return gulp.src('dev/img/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(size({title: 'images'}))
        .pipe(gulp.dest('public/img'));
});

// SASS
gulp.task('styles', function() {
    return gulp.src('dev/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cssnano({discardComments: {removeAll: true}}))
        .pipe(rename('ritchiejacobs.min.css'))
        .pipe(size({title: 'styles'}))
        .pipe(gulp.dest('public/css'));
});

// JAVASCRIPT
gulp.task('scripts', function () {
    return gulp.src('dev/js/*.js')
        .pipe(uglify())
        .pipe(rename('ritchiejacobs.min.js'))
        .pipe(size({title: 'scripts'}))
        .pipe(gulp.dest('public/js'))
});

// SERVER
gulp.task('serve', ['default'], function() {
    browserSync({
        server: ['./'],
        port: 3000
    });

    gulp.watch(['*.html'], reload);
    gulp.watch(['dev/scss/**/*.scss'], ['styles', reload]);
    gulp.watch(['dev/js/*.js'], ['scripts', reload]);
    gulp.watch(['dev/img/*'], reload);
});

// Default task
gulp.task('default', ['images', 'styles', 'scripts']);

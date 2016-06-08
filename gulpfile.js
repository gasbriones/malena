var babel = require('gulp-babel')
var browserify = require('browserify')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var gulp = require('gulp')
var livereload = require('gulp-livereload')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var watchify = require('watchify')
var haml = require('gulp-haml');
var fileinclude = require('gulp-file-include');

gulp.task('server', function () {
    connect.server({
        host: '0.0.0.0',
        root: ['dist'],
        port: 8001,
        livereload: true
    })
})

gulp.task('fileinclude', function() {
    gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '/app/'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('haml', function () {
    gulp.src('app/**/*.haml')
        .pipe(haml({
            compiler: 'visionmedia',
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
});

gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload())
})

gulp.task('watch', function() {
    livereload.listen()
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/**/*.haml', ['haml']);
})

gulp.task('dev', ['watch', 'sass', 'server','haml'])
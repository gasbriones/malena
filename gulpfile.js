var gulp = require('gulp')
var connect = require('gulp-connect')
var livereload = require('gulp-livereload')
var sass = require('gulp-sass')
var haml = require('gulp-haml');
var prettify = require('gulp-prettify');
var clean = require('gulp-clean')

gulp.task('server', function () {
    connect.server({
        host: '0.0.0.0',
        root: ['dist'],
        port: 8001,
        livereload: true
    })
})

gulp.task('copy', function() {
    gulp.src(['app/fonts/*.*'])
        .pipe(gulp.dest('dist/fonts/'))
    gulp.src(['app/images/*.*'])
        .pipe(gulp.dest('dist/images/'))
});

gulp.task('haml', function () {
    gulp.src('app/**/*.haml')
        .pipe(haml({
            compiler: 'visionmedia',
            format: 'html'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
});

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload())
})

gulp.task('prettify', function () {
    gulp.src('dist/*.html')
        .pipe(prettify({indent_size: 2}))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function () {
    livereload.listen()
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/**/*.haml', ['haml']);
    gulp.watch('dist/*.html', ['prettify']);
})

gulp.task('dev', ['watch', 'sass', 'server', 'haml', 'prettify','copy'])
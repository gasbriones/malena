var gulp = require('gulp')
var connect = require('gulp-connect')
var livereload = require('gulp-livereload')
var sass = require('gulp-sass')
var haml = require('gulp-haml');
var prettify = require('gulp-prettify');
var babel = require('gulp-babel')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var browserify = require('gulp-browserify')


var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);
    this.emit('end');
};

gulp.task('server', function () {
    connect.server({
        host: '0.0.0.0',
        root: ['dist'],
        port: 8088,
        livereload: true
    })
})

gulp.task('copy', function () {
    gulp.src(['app/fonts/*.*'])
        .pipe(gulp.dest('dist/fonts/'))
    gulp.src(['app/images/*.*'])
        .pipe(gulp.dest('dist/images/'))
    gulp.src(['app/mocs/*.*'])
        .pipe(gulp.dest('dist/mocs/'))
});

gulp.task('buildJsx', function () {
    return gulp.src("app/js/jsx/**/*.jsx")
        .pipe(plumber({errorHandler: onError}))
        .pipe(babel({
            presets: ['react', 'es2015','stage-0'],
        }))
        .pipe(gulp.dest("dist/build"))
});

gulp.task('scripts', function () {
    return gulp.src('app/js/controller/*.js')
        .pipe(plumber({errorHandler: onError}))
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('dist/build'))
});


gulp.task('haml', function () {
    return gulp.src('app/**/*.haml')
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

gulp.task('watch',['sass', 'buildJsx', 'scripts'] , function(){
    livereload.listen()
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/**/*.haml', ['haml']);
    gulp.watch('app/js/jsx/**/*.jsx', ['buildJsx', 'scripts']);
    gulp.watch('app/js/controller/*.js', ['scripts']);
});

gulp.task('dev', ['watch','sass', 'server','haml','prettify','copy'])
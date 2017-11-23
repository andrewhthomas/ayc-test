var gulp = require('gulp'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  imagemin = require('gulp-imagemin'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

gulp.task('clean', function () {
  return gulp.src('./public', {
      read: false
    })
    .pipe(clean());
});

gulp.task('connect', function () {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('css', function () {
  gulp.src('./resources/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(concat('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
  gulp.src('resources/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
});

gulp.task('img', function () {
  gulp.src('resources/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html'])
  gulp.watch(['./resources/scss/**/*.scss'], ['css'])
  gulp.watch(['./resources/js/*.js'], ['js'])
  gulp.watch(['./resources/img/**/*'], ['img']);;
});

gulp.task('build', ['clean', 'html', 'css', 'js', 'img']);

gulp.task('default', ['clean', 'html', 'css', 'js', 'img', 'connect', 'watch']);

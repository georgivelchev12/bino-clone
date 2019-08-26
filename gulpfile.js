var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel')
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('default', () =>
  gulp.src('src/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/scripts'))
);

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/scripts/*.js', gulp.series('default'));

});
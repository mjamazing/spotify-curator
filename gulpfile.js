// Include Gulp
var gulp = require('gulp');
var del = require('del');

var yarn = require('gulp-yarn');

gulp.task('yarn', function() {
    return gulp.src(['./package.json', './yarn.lock'])
        .pipe(yarn({
            production: true
        }));
});

gulp.task('clean', function() {
    console.log("Delete the build folder");
    del(['build/**/*']);
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('build'));
});

// Alias build to js
gulp.task('build', ['js']);

// Default Task
gulp.task('default', ['js']);
// Include Gulp
var gulp = require('gulp');

var yarn = require('gulp-yarn');

gulp.task('yarn', function() {
    return gulp.src(['./package.json', './yarn.lock'])
        .pipe(yarn({
            production: true
        }));
});

gulp.task('clean', [], function() {
    console.log("Clean all files in build folder");

    return gulp.src("build/*", { read: false }).pipe(clean());
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('build'));
});

// Default Task
gulp.task('default', ['js']);
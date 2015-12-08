var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');

var jshint_config = {
	bitwise: true,
	browser: true,
	curly: true,
	eqeqeq: true,
	forin: true,
	immed: true,
	indent: 4,
	noarg: true,
	node: true,
	noempty: true,
	nonbsp: true,
	quotmark: 'single',
	strict: true,
	undef: true,
	unused: true
};

gulp.task('default', ['html', 'css', 'js'], function() {});

gulp.task('html', function() {
	gulp.src('src/*.htm*')
		.pipe(gulp.dest('public'));
});

gulp.task('css', function() {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/css'));
});

gulp.task('jshint', function () {
	return gulp.src(['src/scripts/*.js', 'src/scripts/**/*.js', 'src/**/*.js'])
		.pipe(jshint(jshint_config))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['jshint'], function () {
	return gulp.src('src/scripts/app.js')
		.pipe(babel())
		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', ['default'], function() {
	gulp.watch('src/*.htm', ['html']);
	gulp.watch('src/scripts/**/*.js', ['js']);
	gulp.watch('src/styles/**/*.scss', ['css']);
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var path = require("path");
var webpack = require("webpack");


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

function handleErrors () {
	var args = Array.prototype.slice.call(arguments);
  	console.log('Compile Error: ', args);
	// Keep gulp from hanging on this task
	this.emit('end');
};

gulp.task('html', function() {
	gulp.src('src/*.htm*')
		.pipe(gulp.dest('public'));
});

gulp.task('css', function() {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass())
		.on('error', handleErrors)
		.pipe(gulp.dest('public/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('public/css'));
});

gulp.task('jshint', function () {
	return gulp.src(['src/scripts/*.js', 'src/scripts/**/*.js', 'src/**/*.js'])
		.pipe(jshint(jshint_config))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['jshint'], function (callback) {

	webpack({
        entry: './src/scripts/app.js',
        output: {
        	path: path.join(__dirname, 'public/js/'),
    		filename: 'app.js'
        }
    }, function(err, stats) {
        if (err) {
        	console.error('Webpack error:', err);
        }
        callback();
    });
});

gulp.task('watch', ['default'], function() {
	gulp.watch('src/*.htm', ['html']);
	gulp.watch('src/scripts/**/*.js', ['js']);
	gulp.watch('src/styles/**/*.scss', ['css']);
});

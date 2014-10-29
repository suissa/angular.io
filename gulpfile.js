'use strict';

var gulp = require('gulp');
var glob = require('glob');
var karma = require('karma').server;
var path = require('path');

var sass = require('gulp-ruby-sass');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var ngTemplates = require('gulp-ng-templates');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
	scripts: 'sources/javascripts/scripts/angular-io.js',
	stylesheets: [
		'sources/javascripts/scripts/**/*.{scss,sass,css}',
		'sources/stylesheets/**/*.{scss,sass,css}',
	],
	templates: 'sources/javascripts/scripts/**/*.{tmpl.html,html}'
};

gulp.task('jshint', function () {
	gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter());
});

gulp.task('stylesheets', function () {
	var dest = path.join(__dirname, 'public', 'css');

	gulp.src(paths.stylesheets)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('app.css'))
		.pipe(gulp.dest(dest));
});

gulp.task('templates', function () {
	var dest = path.join(__dirname, 'public', 'js');

	gulp.src(paths.templates)
		.pipe(ngTemplates({
			filename: 'templates.js',
			standalone: false,
			module: 'angular-io',
			path: function (path, base) {
				return path.replace(base, '');
			}
		}))
		.pipe(gulp.dest(dest));
});

gulp.task('scripts', ['jshint'], function () {
	var dest = path.join(__dirname, 'public', 'js');

	gulp.src(paths.scripts)
		.pipe(browserify({
			debug: true
		}))
		.pipe(ngAnnotate())
		.pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
	gulp.watch('sources/javascripts/scripts/**/*.js', ['scripts']);
	gulp.watch(paths.stylesheets, ['stylesheets']);
	gulp.watch(paths.templates, ['templates']);
});

gulp.task('test', function (done) {
	karma.start({
		configFile: path.join(__dirname, 'karma.conf.js'),
		singleRun: true
	}, done);
});

gulp.task('serve', function () {
	nodemon({
		script: __dirname
	});
});

gulp.task('bundles', ['scripts', 'stylesheets', 'templates']);
gulp.task('default', ['bundles', 'watch', 'serve']);
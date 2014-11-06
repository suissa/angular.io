'use strict';

var gulp = require('gulp');
var glob = require('glob');
var karma = require('karma').server;
var path = require('path');

var sass = require('gulp-sass');
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
		'sources/{javascripts/scripts,stylesheets}/**/*.{scss,sass,css}',
		'bower_components/codemirror/**/*.css'
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

gulp.task('dependencies', function () {
	gulp.src([
		'bower_components/codemirror/keymap/sublime.js',
		'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
		'bower_components/codemirror/mode/javascript/javascript.js',
		'bower_components/codemirror/mode/htmlembedded/htmlembedded.js'
	])
		.pipe(concat('modes.js'))
		.pipe(gulp.dest('public/lib/codemirror'));

	gulp.src([
		'bower_components/codemirror/addon/display/*.js',
		'bower_components/codemirror/addon/edit/*.js',
		'bower_components/codemirror/addon/comment/*.js',
		'bower_components/codemirror/addon/hint/show-hint.js',
		'bower_components/codemirror/addon/hint/javascript-hint.js',
		'bower_components/codemirror/addon/selection/*.js',
		'bower_components/codemirror/addon/scroll/scrollpastend.js',
		'bower_components/codemirror/addon/mode/multiplex.js',
		'bower_components/codemirror/addon/fold/*.js',
		'bower_components/codemirror/addon/runmode/colorize.js',
		'bower_components/codemirror/addon/tern/tern.js',
		'bower_components/codemirror/addon/search/*.js'
	])
		.pipe(concat('addons.js'))
		.pipe(gulp.dest('public/lib/codemirror'));
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
		.pipe(concat('angular-io.js'))
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
	require(__dirname);
});

gulp.task('bundles', ['scripts', 'stylesheets', 'templates']);
gulp.task('default', ['dependencies', 'bundles', 'watch', 'serve']);
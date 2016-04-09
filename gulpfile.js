'use strict';

/* --------- api --------- */
// gulp - watching
// gulp sprite - sprite generation
// gulp clean - clean prod/js

/* --------- components --------- */
var gulp 		 = require('gulp'),
	concat		 = require('gulp-concat'),
	browserSync  = require('browser-sync'),
	uglify   	 = require('gulp-uglify'),
	sass 		 = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	jade		 = require('gulp-jade'),
	spritesmith	 = require('gulp.spritesmith'),
	clean		 = require('gulp-rimraf'),
	imagemin	 = require('gulp-imagemin'),
	plumber	 	 = require('gulp-plumber');

/* --------- paths --------- */
var paths = {
	sass: {
		src: 'dev/sass/**/*.scss',
		location: 'dev/sass/main.scss',
		destination: 'prod/css'
	},

	js: {
		src: 'dev/js/**/*.js',
		plug: 'dev/plugins/**/*.js',
		destination: 'prod/js'
	},

	jade: {
		src: 'dev/jade/**/*.jade',
		location: 'dev/jade/*.jade',
		destination: 'prod'
	}
};

/* ----- jade ----- */
gulp.task('jade-compile', function () {
	gulp.src(paths.jade.location)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t'
		}))
		.pipe(gulp.dest(paths.jade.destination))
});

/* ------ sass ------ */
gulp.task('sass-compile', function () {
	gulp.src(paths.sass.location)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		// .pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
		.pipe(autoprefixer({
        	browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
      	}))
		.pipe(concat("main.min.css"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.sass.destination));
});

/* -------- concat js custom -------- */
gulp.task('concat-js', function () {
	return gulp.src(paths.js.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.js.destination));
});

/* -------- concat js plugins -------- */
gulp.task('concat-js-plugins', function() {
	return gulp.src([
		'./dev/plugins/jquery/dist/jquery.min.js'
		])
		.pipe(plumber())
		.pipe(concat('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.destination));
});

/* -------- images -------- */
gulp.task('images', function () {
    return gulp.src('dev/images/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('prod/images/'));
});

/* -------- favicon -------- */
gulp.task('favicon', function () {
    return gulp.src('dev/images/favicon/*.+(ico|png|json|svg|xml)')
        .pipe(gulp.dest('prod/images/favicon/'));
});

/* -------- fonts -------- */
gulp.task('fonts', function () {
    return gulp.src('dev/fonts/**/*.+(eot|svg|ttf|woff|woff2)')
        .pipe(gulp.dest('prod/fonts/'));
});

/* -------- clean prod/js -------- */
gulp.task('clean', function() {
	return gulp.src('prod/js/*.js', { read: false })
		.pipe(rimraf());
});

/* -------- auto sprites  -------- */
gulp.task('sprite', function () {
	var spriteData = gulp.src('dev/images/sprites/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			imgPath: '../prod/images/sprite.png',
			cssName: 'sprite.scss',
			padding: 20,
			algorithm: 'left-right'
		}));
	spriteData.img.pipe(gulp.dest('prod/images/'));
	spriteData.css.pipe(gulp.dest('dev/sass/'));
});

/* -------- gulp server  -------- */
gulp.task('server', function () {
	browserSync({
		port: 9000,
		browser: ['google chrome'],
		server: {
			baseDir: ["dev", "prod"],
			index: "index.html"
		}
	});
});

/* -------- gulp watching  -------- */
gulp.task('watch', function () {
	gulp.watch(paths.jade.src, ['jade-compile']);
	gulp.watch(paths.sass.src, ['sass-compile']);
	gulp.watch(paths.js.src, ['concat-js']);
	gulp.watch(paths.js.plug, ['concat-js-plugins']);
	gulp.watch('dev/images/*.+(png|jpg|jpeg|gif|svg)', ['images']);
	gulp.watch('dev/images/favicon/*.+(ico|png|json|svg|xml)', ['favicon']);
	gulp.watch('dev/fonts/**/*.+(eot|svg|ttf|woff|woff2)', ['fonts']);
	gulp.watch([
		'prod/*.html',
		'prod/css/*.css',
		'prod/js/*.js'
	]).on('change', browserSync.reload);
});

gulp.task('default', [
	'jade-compile',
	'sass-compile',
	'concat-js',
	'concat-js-plugins',
	'images',
	'favicon',
	'fonts',
	'server',
	'watch'
]);

// ===================== Functions ======================

// Working with the errors
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}

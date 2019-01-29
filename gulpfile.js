// Load Gulp...of course
const { src, dest, task, watch, series, parallel } = require('gulp');

// CSS related plugins
var sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
// JS related plugins
	uglify = require('gulp-uglify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	stripDebug = require('gulp-strip-debug'),
	browserify = require('browserify'),
// Utility plugins
    concat = require('gulp-concat'), 
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	options = require('gulp-options'),
	gulpif = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'), // sourcemaps 호출
	sassdoc = require('sassdoc'),
 // Browers related plugins
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;


// Project related variables
var styleSRC     = './public/src/sass/**/*.scss',
 	styleURL     = './public/dist/css/',
	mapURL       = './public/',

 	jsSRC        = './public/src/js/',
 	jsFront      = 'main.js',
 	jsFiles      = [ jsFront ],
 	jsURL        = './public/dist/js/',

 	imgSRC       = './public/src/images/**/*',
 	imgURL       = './public/dist/images/',

 	fontsSRC     = './public/src/fonts/**/*',
 	fontsURL     = './public/dist/fonts/',

 	htmlSRC     = './public/src/**/*.html',
 	htmlURL     = './public/dist/',

 	styleWatch   = './public/src/sass/**/*.scss',
 	jsWatch      = './public/src/js/**/*.js',
 	imgWatch     = './public/src/images/**/*.*',
 	fontsWatch   = './public/src/fonts/**/*.*',
 	htmlWatch    = './public/src/**/*.html';


// Tasks
function browser_sync() {
	browserSync.init({
		server: {
            baseDir: './dist/',
            directory : true
        },
        port : 8080
	});
}

function reload(done) {
	browserSync.reload();
	done();
}

var config = {
	'sassdoc': {
	 verbose: true
   }
 }
 
function css(done) {
	src( [ styleSRC ] )
		.pipe( sassdoc(config.sassdoc) )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		//.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( dest( styleURL ) )
		.pipe( browserSync.stream() );
	done();
};

function js(done) {
	jsFiles.map( function( entry ) {
		return browserify({
			entries: [jsSRC + entry]
		})
		.transform( babelify, { presets: [ '@babel/preset-env' ] } )
		.bundle()
		.pipe( source( entry ) )
		.pipe( rename( {
			extname: '.min.js'
        } ) )
		.pipe( buffer() )
		.pipe( gulpif( options.has( 'production' ), stripDebug() ) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( dest( jsURL ) )
		.pipe( browserSync.stream() );
	});
	done();
};

function triggerPlumber( src_file, dest_file ) {
	return src( src_file )
		.pipe( plumber() )
		.pipe( dest( dest_file ) );
}

function images() {
	return triggerPlumber( imgSRC, imgURL );
};

function fonts() {
	return triggerPlumber( fontsSRC, fontsURL );
};

function html() {
	return triggerPlumber( htmlSRC, htmlURL );
};

function watch_files() {
	watch(styleWatch, series(css, reload));
	watch(jsWatch, series(js, reload));
	watch(imgWatch, series(images, reload));
	watch(fontsWatch, series(fonts, reload));
	watch(htmlWatch, series(html, reload));
	/*src(jsURL + 'main.min.js')
		.pipe( notify({ message: 'Gulp is Watching, Happy Coding!' }) );*/
}

task("css", css);
task("js", js);
task("images", images);
task("fonts", fonts);
task("html", html);
task("default", parallel(css, images, fonts, html, browser_sync, watch_files));

//task("watch", parallel(browser_sync, watch_files));
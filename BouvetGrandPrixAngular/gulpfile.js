const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const Builder = require('systemjs-builder');
//const wait = require('gulp-wait');

const tsProject = typescript.createProject("tsconfig.json");

var appDev = 'app';
var appProd = 'dist/app';

// clean the contents of the distribution directory
gulp.task('clean', function (done) {
    del('dist/**/*');
    setTimeout(function () {
        done();
    }, 1000);
});

// TypeScript compile
gulp.task('compile', function (done) {
    return new Promise(function (resolve, reject) {
        console.log("compiling..");

        gulp.src(appDev + '/**/*.ts')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(tsProject())
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appProd));

        setTimeout(function () {
            resolve();
        }, 10000);
    });
});

gulp.task('bundle', function (done) {
    console.log("bundeling..");
    var builder = new Builder('', 'system.config.js')

    return builder
    .buildStatic(appProd + '/main.js', appProd + '/bundle.js', { minify: true, sourcemaps: true })
    .then(function () {
        console.log('Build complete');
    })
    .catch(function (err) {
        console.log('Build error');
        console.log(err);
    })
    done();
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', () => {
    console.log("copy assets..");
    return gulp.src([
        'app/**/*',
        'index.html',
        'shared_styles.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/leaflet/dist/leaflet.css',
        'node_modules/bootstrap/dist/fonts/*',
        '!app/**/*.js',
        '!app/**/*.js.map',
        '!app/**/*.ts'],
        { base: './' })
      .pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', function (done) {
    console.log("copy liberaries..");
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/leaflet/dist/leaflet.js',
    ], { base: './' })
      .pipe(gulp.dest('dist'))
    done();
});


// Watch for changes in TypeScript, HTML and CSS files.
gulp.task('watch', function () {
    console.log("watching files for change..");
    gulp.watch(["app/**/*.ts"], ['compile','bundle']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["app/**/*.html", "app/**/*.css", "shared_styles.css"], ['copy:assets']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    done();
});

gulp.task('build', gulp.series('clean','compile', 'bundle', 'copy:assets', 'copy:libs'));
gulp.task('realtime', gulp.series('build', 'watch'));
gulp.task('default', gulp.series('compile'));
gulp.task('ts', gulp.series('compile','bundle'))

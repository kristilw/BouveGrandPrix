const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const tsProject = typescript.createProject("tsconfig.json");

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return;// del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
    //return gulp
    //  .src('app/**/*.ts')
    //  .pipe(sourcemaps.init())
    //  .pipe(typescript(tscConfig.compilerOptions))
    //  .pipe(concat('scripts.js'))
    //  .pipe(gulp.dest('dist/app'))
    //  .pipe(rename('main.min.js'))
    //  .pipe(uglify())
    //    
    //  .pipe(sourcemaps.write('.'))
    //  .pipe(gulp.dest('dist/app'));

    var tsResult = gulp.src("app/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(tsProject());
    return tsResult.js
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist/app'));
});


// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
    return gulp.src([
        'app/**/*',
        'systemjs.config.js',
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
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/**/*.js',
        'node_modules/rxjs/**/*.js.map',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/leaflet/dist/leaflet.js',
        'systemjs.config.js',
        'node_modules/@angular/**/*.js'
    ], { base: './' })
      .pipe(gulp.dest('dist'))
});


// Watch for changes in TypeScript, HTML and CSS files.
gulp.task('watch', function () {
    gulp.watch(["app/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["app/**/*.html", "app/**/*.css"], ['copy:assets']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

gulp.task('build', ['compile', 'copy:assets', 'copy:libs']);
gulp.task('realtime', ['build', 'watch']);
gulp.task('default', ['build', 'watch']);

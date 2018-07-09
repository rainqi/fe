const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const babelify = require('babelify');
const path = require('path');
const header = require('gulp-header');
const runSequence = require('run-sequence');
const bro = require('gulp-bro');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

const dirs = {
  root: './assets/clientlibs/',
  views: './views',
  vendor: './assets/clientlibs/vendor',
  component: './assets/clientlibs/component',
  template: './assets/clientlibs/template',
  utilities: './assets/clientlibs/utilities',
};

const CONFIG = {
  themes: ['base'], // all the available themes
};

const jsPluginsList = require(`./${path.join(dirs.vendor, 'plugins')}`);

// default task
gulp.task('default', () => {
  gutil.log('::::: Current Gulp CONFIG ::::: ');
  gutil.log(CONFIG);
  runSequence('sass-dev', 'sass-lang', 'concat:js:plugins', 'browserify', 'watch');
});


/**
 * Watch sass file changes
 */
gulp.task('watch', () => {
  const { themes } = CONFIG;
  const watchFiles = [
    path.join(dirs.root, 'template/base/lang/sass/*.scss'),
    path.join(dirs.component, '**/*.scss'),
  ];

  // compile each theme sass
  themes.map((theme) => {
    watchFiles.push(path.join(dirs.root, `template/${theme}/sass/*.scss`));
    watchFiles.push(path.join(dirs.root, `template/${theme}/sass/**/*.scss`));
    watchFiles.push(path.join(dirs.root, `template/${theme}/sass/**/**/*.scss`));
    watchFiles.push(path.join(dirs.root, `template/${theme}/lang/sass/*.scss`));
  });

  gulp.watch(watchFiles, ['sass-dev', 'sass-lang']);

  gulp.watch([path.join(dirs.component, '*/es6/**/*.js'), path.join(dirs.utilities, '**/*.js')], ['browserify']);
});

/* compile theme sass */
gulp.task('sass-dev', () => {
  const { themes } = CONFIG;
  return themes.map((theme) => {
    gutil.log(`::::: Gulp Task is going to compile SASS in template/${theme}/sass/base.scss:::::`);
    return gulp
      .src(path.join(dirs.root, `template/${theme}/sass/base.scss`))
      .pipe(header(`/* ${new Date().toString()} */\n`))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(`${dirs.root}template/${theme}/css`));
  });
});

/**
 * Compile locales css
 */
gulp.task('sass-lang', () => {
  const { themes } = CONFIG;
  return themes.map((theme) => {
    gutil.log(`::::: Gulp Task is going to compile SASS lang in template/${theme}/lang/sass/:::::`);
    return gulp
      .src(path.join(dirs.root, `template/${theme}/lang/sass/*.scss`))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(`${dirs.root}template/${theme}/css/lang`));
  });
});


// validate js
gulp.task('validate-eslint', () => {
  gutil.log(`::::: Gulp Task is going to validate js in ${dirs.component}/**/es6/ and ${dirs.utilities}/:::::`);
  return gulp.src([path.join(dirs.component, '**/es6/*.js'), path.join(dirs.utilities, '*.js')])
    .pipe(eslint({
      configFile: '.eslintrc',
    }))
    .pipe(eslint.format())
    .pipe(eslint.results(results => {
      console.log(`Total Warnings: ${results.warningCount}`);
      console.log(`Total Errors: ${results.errorCount}`);
      if (!results.errorCount && !results.warningCount){
        gutil.log(`::::: Successful JS validation:::::`);
      }
    }))
    .pipe(eslint.failAfterError());
});

// minify js
gulp.task('minify-js', () => {
  gutil.log(`::::: Gulp Task is going to minify js in ${dirs.component}/base/js/*.js):::::`);
  return gulp.src([path.join(dirs.component, 'base/js/*.js')])
    .pipe(uglify())
    .pipe(gulp.dest(`${dirs.component}/base/js/`));
});

// Compile base js
gulp.task('browserify', () => {
  gutil.log(`::::: Gulp Task is going to compile ${dirs.template}/base/es6/base.js :::::`);
  return gulp.src(path.join(dirs.template, 'base/es6/base.js'))
    .pipe(bro({
      transform: [
        babelify.configure({
          presets: ['es2015'],
        }),
      ],
    }))
    .pipe(header(`/* ${new Date().toString()} */\n`))
    .pipe(gulp.dest(path.join(dirs.template, 'base/js')));
});

/**
 * Compile plugin javascript
 */
gulp.task('concat:js:plugins', () => {
  gutil.log(`::::: Gulp Task is going to compile Javascript in ${dirs.vendor} folder :::::`);
  return gulp.src(jsPluginsList.map(item => `${dirs.vendor}/${item}`))
    .pipe(header(`/* ${new Date().toString()} */\n`))
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(path.join(dirs.template, 'base/js')));
});

// load the plugins
var gulp        = require('gulp');
var minifyCSS   = require('gulp-minify-css');
// var minifyHTML  = require('gulp-htmlmin');
var rename      = require('gulp-rename');
var jshint      = require('gulp-jshint');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var ngAnnotate  = require('gulp-ng-annotate');
var nodemon     = require('gulp-nodemon');
// var coffee      = require('gulp-coffee');
var sass        = require('gulp-sass');
// var jade        = require('gulp-jade');
var notify      = require('gulp-notify');
// var livereload  = require('gulp-livereload');

// TASK: compile Sass to CSS and minify
gulp.task('css', function() {
    // grab sass file, process, save to style.css in assets
    return gulp.src('public/assets/css/style.sass')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/assets/css'));
});


// TASK: lint JS
gulp.task('js', function() {
    return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// TASK: Lint API and restart server
gulp.task('api', function() {
    return gulp.src(['app/*.js', 'app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
        // .pipe(emit('restart'));
});

// TASK: lint, minify, concat frontend JS
gulp.task('scripts', function() {
    return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('all.js'))
        .uglify()
        .pipe(gulp.dest('public/dist'));
});

// TASK: lint, minify, concat frontend Angular
gulp.task('angular', function() {
    return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});


// Handle Server ops w/ nodemon
gulp.task('nodemon', function() {
    // livereload.listen();  // listen for changes

    nodemon({
        script: 'server.js',
        ext: 'js less html',
        watch: ['server.js', 'gulpfile.js', 'app/*.js', 'app/**/*.js']
    })
        .on('restart', function() {
            // when the app has restarted, run livereload
            // gulp.src('server.js')
                // .pipe(livereload())
                // .pipe(notify("Reloading the page, please wait . . ."));
            console.log("Restarted!");
        });
});

// Watch and run tasks
gulp.task('watch', function() {
    // watch sass file, and run css task
    gulp.watch('public/assets/css/style.sass', ['css']);

    // watch js files and rn lint and run js and angular tasks
    gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
    
    // watch api files and run nodemon 
    gulp.watch(['server.js', 'app/*.js', 'app/**/*.js'], ['api']); //
});

// Default task is nodemon
gulp.task('default', ['nodemon', 'watch']);

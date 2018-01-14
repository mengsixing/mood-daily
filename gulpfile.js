const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('builddev', function() {
	gulp.src('./src/nodeuii/**/*.js')
	.pipe(babel({
		babelrc: false,
		"plugins": [
			"transform-es2015-modules-commonjs"
		]
	}))
	.pipe(gulp.dest('./nodeserver'))
});

gulp.task('buildprod', function() {
	gulp.src('./src/nodeuii/**/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('./build2'))
});


gulp.task('default', [process.env.NODE_ENV == 'production' ? 'buildprod' : 'builddev']);
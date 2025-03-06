const gulp = require('gulp');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');

const config = {
	paths: {
		//base: 'assets',
		entry: {
			js: [
			],
			scss: [
				'css/*.scss'
			],
		},
		output: {
			css: 'css',
		},
		watch: {
			scss: 'css/*.scss',
		}
	}
}

//компилим css
gulp.task('scss', function () {
	return gulp
		.src(config.paths.entry.scss)
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(autoprefixer(['last 2 versions']))
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest(config.paths.output.css))
		.pipe(browserSync.stream())
})


//смотрим за изменением файлов и перекомпиливаем стили и скрипты
gulp.task('watch', function () {
	gulp.watch(config.paths.watch.scss, gulp.series('scss'))
})

//все полностью собираем
gulp.task('build', gulp.parallel('scss'))
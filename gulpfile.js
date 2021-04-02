const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const del = require("del");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

const jsmin = () => {
  return gulp
    .src("source/js/*")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("build"));
};

const image = () =>
  gulp.src("source/img/*").pipe(imagemin()).pipe(gulp.dest("build/img"));

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

const clean = async () => {
  await del(["build"]);
};

exports.default = gulp.series(styles, server, watcher);

const copy = () => {
  return gulp
    .src(["source/fonts/**", "source/svg/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
};

exports.build = gulp.series(clean, copy, html, jsmin, image, styles);

// gulp.task("copy", function () {
//   return gulp
//     .src(["source/fonts/**/*.{woff,woff2}", "source/img/**", "source/js/**"], {
//       base: "source",
//     })
//     .pipe(gulp.dest("build"));
// });

// gulp.task("clean", function () {
//   return del("build");
// });

// gulp.task("build", function (done) {
//   gulp.run("clean", "copy", "style", "html", done);
// });

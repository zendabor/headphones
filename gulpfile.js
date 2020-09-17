const gulp = require('gulp');
const Bundler = require('parcel-bundler');
const Path = require('path');
const browserSync = require('browser-sync').create();

const OUT_DIR = Path.resolve(__dirname, './dist');

var browserSyncConfig = {
  server: {
    baseDir: OUT_DIR
  },
  // tunnel: true,
  host: 'localhost',
  port: 3000
};

function _bundle(optionOverrides = {}) {
  const options = Object.assign({
    outDir: OUT_DIR, // The out directory to put the build files in, defaults to dist
    // outFile: '/widget/widget.html', // The name of the outputFile

    // must be set to relative otherwise in widget.html the injection are absolute path and break
    publicUrl: './', // The url to serve on, defaults to dist

    watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    global: 'moduleName', // Expose modules as UMD under this name, disabled by default
    minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser', // Browser/node/electron, defaults to browser
    // https: { // Define a custom {key, cert} pair, use true to generate one or false to use http
    //   cert: './ssl/cert.pem', // Path to custom certificate
    //   key: './ssl/key.pem' // Path to custom key
    // },
    logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
    hmr: false, // Enable or disable HMR while watching
    hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    hmrHostname: '', // A hostname for hot module reload, default to ''
    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
    detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  }, optionOverrides);

  console.log(Path.join(__dirname, 'src/*.html'));
  const entryFiles = [
    Path.join(__dirname, 'src/*.html'), 
    // Path.join(__dirname, 'src/*.hbs')
  ];

  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  return bundler;
}

async function serveTask(done) {
  const bundler = _bundle();

  bundler.on('buildEnd', () => {
    console.log('bundler: buildEnd');
    browserSync.reload();
  });

  await bundler.bundle();

  browserSync.init(browserSyncConfig);

  done();
}


gulp.task('serve', gulp.series([serveTask]));

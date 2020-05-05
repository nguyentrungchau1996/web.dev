const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const dist = path.resolve(__dirname, '..', '..', 'dist');

describe('Build test', function() {
  it('generates the expected files', async function() {
    // Disable the timeout as it'll take build a little while to finish.
    // eslint-disable-next-line
    this.timeout(0);

    console.log('Running npm run build...');
    try {
      await exec('npm run build');
    } catch (err) {
      assert.fail(err);
    }
    console.log('Build completed. Starting tests.');

    [
      path.join('en', '_redirects.yaml'),
      path.join('en', 'algolia.json'),
      path.join('en', 'feed.xml'),
      path.join('en', 'index.html'),
      path.join('en', 'index.json'),
      path.join('en', 'robots.txt'),
      path.join('en', 'authors', 'addyosmani', 'feed.xml'),
      path.join('en', 'tags', 'progressive-web-apps', 'feed.xml'),
      path.join('images', 'favicon.ico'),
      path.join('images', 'lockup.svg'),
      'app.css',
      'bootstrap.js',
      'manifest.webmanifest',
      'nuke-sw.js',
      'sitemap.xml',
      'sw-partial-layout.partial',
      'sw.js',
    ].forEach((file) =>
      assert.ok(
        fs.existsSync(path.join(dist, file)),
        `Could not find ${file} in ${dist}`,
      ),
    );

    const contents = fs.readdirSync(dist);

    // Check that there's a Rollup-generated file with the given name that looks
    // like `[name]-[hash].js`.
    ['entrypoint', 'measure', 'newsletter', 'default'].forEach((chunked) => {
      const re = new RegExp(`^${chunked}-\\w+\\.js$`);
      assert(
        contents.find((file) => re.test(file)),
        `Could not find Rollup output: ${chunked}`,
      );
    });
  });
});
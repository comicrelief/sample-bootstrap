const async = require('async');
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

let config;

// Get lighthouse custom config
if (fs.existsSync('../../../repository/tests/lighthouse-config.js')) {
  config = require('../../../repository/tests/lighthouse-config.js');
  console.log('Using custom lighthouse configuration file, as provided by repository');
} else {
  config = require('./config.js');
  console.log('Using default lighthouse configuration as provided by tools repository');
}

// Get Pages to test against.
const pages = require('../../../repository/tests/test-urls.json');
console.log('Pages to test', pages);

// Use environment variables to pass in our base and ref URLs
const baseUrl = process.env.LIGHTHOUSE_BASE_URL;

// Define the chrome launcher configuration.
const chromeLauncherConfig = {
  chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
};

// Define the output folder.
const outputFolder = './tests/lighthouse/';

let indexHtml = '<html><body><h1>Lighthouse Reports</h1>';
let testStatus = {
  ok: true,
};

// Launch chrome
chromeLauncher.launch(chromeLauncherConfig).then(chrome => {

  // Async loop through pages.
  async.eachSeries(pages, function iterator(page, callback) {

    let url = (baseUrl + page).split("//").join("/");

    // Pre-warm the lighthouse cache.
    lighthouse(url, { port: chrome.port }, config).then((results) => {

      // Generate the lighthouse report.
      return lighthouse(url, { port: chrome.port }, config);

    }).then((results) => {

      const resultObj = results.lhr;

      indexHtml += '<div>';
      indexHtml += '<a href="' + page.split("/").join("_") + '_page.html">' + url + '</a>';

     // If the performance or accessibility score is less than 90, then mark as a fail.
      if (resultObj.categories.performance.score < 0.9 || resultObj.categories.accessibility.score < 0.9) {
        indexHtml += '<span style="color:red;"> (Failed)</span>';
        testStatus.ok = false;
      }

      indexHtml += '</div>';

      // Create the lighthouse html file.
      const report = ReportGenerator.generateReport(results.lhr, 'html');
     return fs.writeFile(outputFolder + page.split("/").join("_") + '_page.html', report, function(err) {
        console.log("Completed page report");
      });

    }).then(() => {

      console.log('Generated report for ' + url);

      callback();

    });
  }, function done() {

    chrome.kill().then(() => {

      indexHtml += '</body></html>';

      // Write the index to a file.
      fs.writeFile(outputFolder + 'index.html', indexHtml, function(err) {
        // Write the overall test status to a file.
        fs.writeFile(outputFolder + 'status.json', JSON.stringify(testStatus), function(err) {
          console.log("Complete");
        });
      });

    });

  });

});

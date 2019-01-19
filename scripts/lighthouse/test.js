const test = require('../../tests/lighthouse/status.json');

let exitCode = 0;

if (test.ok === false) {
  exitCode = 1;
}

process.exit(exitCode);

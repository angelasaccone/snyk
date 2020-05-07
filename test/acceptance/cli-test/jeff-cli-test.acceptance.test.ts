import { test } from 'tap';
import { exec } from 'child_process';
import { sep } from 'path';
import { fstat, readFileSync, unlinkSync } from 'fs';
const osName = require('os-name');

const main = './dist/cli/index.js'.replace(/\//g, sep);

// jeff
// this should go in test/acceptance/cli-args.test.ts but I can't get that test to run (locally)
test('`test --json-file-output produces same JSON output as normal JSON output to stdout`', (t) => {
  t.plan(1);

  exec(
    `node ${main} test --json --json-file-output=snyk-direct-json-test-output.json`,
    (err, stdout) => {
      if (err) {
        throw err;
      }

      const stdoutJson = stdout.trim();
      const outputFileContents = readFileSync(
        'snyk-direct-json-test-output.json',
        'utf-8',
      ).trim();
      unlinkSync('./snyk-direct-json-test-output.json');

      t.equals(stdoutJson, outputFileContents);
    },
  );
});

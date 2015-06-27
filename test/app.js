'use strict';

var getOutput = require('./lib/get-output');

var test = require('tape');

var path = require('path');


getOutput = getOutput.bind(null, path.join(__dirname, 'app/bin/cli.js'));

var data = (function () {
  var help = 'Usage information.';
  var version = 'v10.130.209';
  return {
    help: help,
    version: version,
    bottomLine: '\n' + version + ' ' + help + '\n'
  };
}());


test('normal output', function (t) {
  t.plan(2);

  getOutput([], function (output) {
    t.equal(output, 'Main output.\n' + data.bottomLine);
  });

  getOutput(['--prefix', 'app', '--adj', 'Some other'], function (output) {
    t.equal(output, '[app] Some other output.\n' + data.bottomLine);
  });
});


test('--help', function (t) {
  getOutput(['--help'], function (output) {
    t.equal(output, data.help + '\n');
    t.end();
  });
});


test('--version', function (t) {
  getOutput(['--version'], function (output) {
    t.equal(output, data.version + '\n');
    t.end();
  });
});

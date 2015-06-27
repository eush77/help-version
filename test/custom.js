'use strict';

var getHelpVersion = require('..'),
    getOutput = require('./lib/get-output');

var test = require('tape');

var path = require('path');


var output = {
  noNewline: getOutput.bind(null, path.join(__dirname, 'custom/no_newline.js')),
  newline: getOutput.bind(null, path.join(__dirname, 'custom/newline.js'))
};


var compareHelpVersion = function (t, helpVersion, expectedHelpVersion) {
  var actualHelpVersion = {
    help: helpVersion.help(),
    version: helpVersion.version()
  };
  t.deepEqual(actualHelpVersion, expectedHelpVersion);
};


test('help, no newline', function (t) {
  t.equal(getHelpVersion('no newline').help(), 'no newline');

  output.noNewline(['--help'], function (output) {
    t.equal(output, 'no newline\n');
    t.end();
  });
});


test('help, with newline', function (t) {
  t.equal(getHelpVersion('newline\n', 'newline\n').help(), 'newline\n');

  output.newline(['--help'], function (output) {
    t.equal(output, 'newline\n');
    t.end();
  });
});

#!/usr/bin/env node
'use strict';

var helpVersion = require('../..')('Usage information.');

var minimist = require('minimist');


(function main(opts) {
  if (opts.prefix) {
    process.stdout.write('[' + opts.prefix + '] ');
  }
  console.log((opts.adj || 'Main') + ' output.');
}(minimist(process.argv.slice(2))));

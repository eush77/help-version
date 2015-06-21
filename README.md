[![npm](https://nodei.co/npm/help-version.png)](https://nodei.co/npm/help-version/)

# help-version

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Automatic handling of `--help` and `--version` arguments for CLI applications.

[travis]: https://travis-ci.org/eush77/help-version
[travis-badge]: https://travis-ci.org/eush77/help-version.svg
[david]: https://david-dm.org/eush77/help-version
[david-badge]: https://david-dm.org/eush77/help-version.png

## Example

```js
#!/usr/bin/env node

var helpVersion = require('help-version')(usage());

function usage() {
  // Makes use of function declarations hoisting.
  return 'Usage:  my-cat [file]';
}

helpVersion.version()
//=> "v0.1.0"

if (process.argv.length != 3) {
  // Shows help and exits with code 1.
  helpVersion.help(1);
}

// Main thing.
fs.createReadStream(process.argv[2])
  .pipe(process.stdout);
```

Catches `--help` and `--version` automatically.

```
$ ./cat.js --help
Usage:  my-cat [file]
$ ./cat.js --version
v0.1.0
$ ./cat.js file.txt
contents of file.txt
```

## API

### `helpVersion = require('help-version')(helpText)`

Checks `process.argv` for `--help` or `--version`, prints `helpText` or app version if found one.

App version is determined from the `version` field from your local `package.json`.

### `helpVersion.help([code], [stream])`

With no arguments, returns the help string.

With one or two arguments, writes it to the `stream` instead and exits with `code`. `stream` defaults to `process.stdout` if `code==0` and `process.stderr` otherwise.

### `helpVersion.version([code], [stream])`

Returns the version string or writes it to `stream` and exits.

## Install

```
npm install help-version
```

## License

MIT

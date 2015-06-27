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

### `helpVersion = require('help-version')(helpText, [opts])`

Checks `opts.argv` for `--help` or `--version`.

1. If `--help` is found, prints `helpText` to `opts.stdout` and calls `opts.exit`.

2. If `--version` is found, prints app version (determined from the `version` field from your local `package.json`) to `opts.stdout` and calls `opts.exit`.

Returns object with two (bound) methods: `helpVersion.help([code], [stream])` and `helpVersion.version([code], [stream])`.

| Option         | Default                 |
| :------------: | :---------------------: |
| `argv`         | `process.argv.slice(2)` |
| `exit([code])` | `process.exit`          |
| `stdout`       | `process.stdout`        |
| `stderr`       | `process.stderr`        |

### `helpVersion.help([code], [stream])`

With no arguments, returns the help string.

With one or two arguments, writes it to the `stream` instead and exits (via `opts.exit`) with `code`. `stream` defaults to `opts.stdout` if `code==0` and `opts.stderr` otherwise.

### `helpVersion.version([code], [stream])`

With no arguments, returns the version string.

With one or two arguments, writes it to the `stream` instead and exits (via `opts.exit`) with `code`. `stream` defaults to `opts.stdout` if `code==0` and `opts.stderr` otherwise.

## Install

```
npm install help-version
```

## License

MIT

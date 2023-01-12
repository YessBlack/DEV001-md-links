#!/usr/bin/env node
const { message } = require('./api');

const { log } = console;
const mdLinks = require('./md_links');
const { welcome } = require('./welcome');

const resolveMDLinks = (path, options) => {
  mdLinks(path, options)
    .then((data) => {
      log(data);
    })
    .catch((error) => {
      log(message(error, 'red'));
    });
};

welcome();

const path = process.argv[2];
const options = process.argv.slice(2);

if (options.length === 1) {
  resolveMDLinks(path, { validate: false });
} else if (options.length === 2) {
  switch (options[1]) {
    case '--validate':
      resolveMDLinks(path, { validate: true });
      break;
    default:
      log(message('Opción no válida', 'red'));
  }
}

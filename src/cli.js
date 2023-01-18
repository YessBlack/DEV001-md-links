#!/usr/bin/env node
const { message } = require('./api');

const { log } = console;
const { mdLinks } = require('./md_links');
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
const options = process.argv.slice(3);
const option = options.join(' ');
if (options.length === 0) {
  resolveMDLinks(path, { validate: false });
} else if (options.length >= 1) {
  switch (option) {
    case '--stats --validate':
      resolveMDLinks(path, { stats: true, validate: true });
      break;
    case '--validate':
      resolveMDLinks(path, { validate: true });
      break;
    case '--stats':
      resolveMDLinks(path, { stats: true });
      break;
    default:
      log(message('Opción no válida', 'red'));
  }
}

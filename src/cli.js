#!/usr/bin/env node
const { message } = require('./api');

const { log } = console;
const mdLinks = require('./md_links');
const welcome = require('./welcome');

welcome();

const path = process.argv[2];
const options = process.argv.slice(2);

if (options.length === 1) {
  mdLinks(path, { validate: false })
    .then((data) => {
      data.forEach((link) => {
        log(message(link, 'green'));
      });
    })
    .catch((error) => {
      log(message(error, 'red'));
    });
}

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const message = (text, color) => chalk.keyword(color)(text);

const formatPath = (route) => route.replace(/\\/g, '/');

const validatePath = (route) => fs.existsSync(route);

const isAbsolute = (route) => path.isAbsolute(route);

const convertToAbsolute = (route) => path.resolve(route);

const statDirectory = (route) => fs.statSync(route).isDirectory();

const readDirectory = (route) => fs.readdirSync(route);

const mdExt = (route) => path.extname(route) === '.md';

const filterMd = (files) => files.filter((file) => mdExt(file));


module.exports = {
  message,
  formatPath,
  validatePath,
  isAbsolute,
  convertToAbsolute,
  statDirectory,
  readDirectory,
  mdExt,
  filterMd,
  readFile,
};


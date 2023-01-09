const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const validateOptions = (options) => options === '--validate' || options === '--stats';

const message = (text, color) => chalk.keyword(color)(text);

const formatPath = (route) => route.replace(/\\/g, '/');

const validatePath = (route) => fs.existsSync(route);

const isAbsolute = (route) => path.isAbsolute(route);

const convertToAbsolute = (route) => path.resolve(route);

const isDirectory = (route) => fs.statSync(route).isDirectory();

const isFile = (route) => fs.statSync(route).isFile();

const readDirectory = (route) => fs.readdirSync(route);

const mdExt = (route) => path.extname(route) === '.md';

const filterMd = (files) => files.filter((file) => mdExt(file));

const readMd = (route) => fs.readFileSync(route, 'utf-8');

const getLinks = (route) => {
  const links = [];
  const mdFile = readMd(route);
  const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
  let match = regex.exec(mdFile);
  while (match !== null) {
    links.push({
      href: match[2],
      text: match[1],
      file: route,
    });
    match = regex.exec(mdFile);
  }
  return links;
};
// const readDirectory = (route) => fs.readdirSync(route);

module.exports = {
  message,
  formatPath,
  validatePath,
  isAbsolute,
  convertToAbsolute,
  isDirectory,
  isFile,
  readDirectory,
  mdExt,
  filterMd,
  readMd,
  getLinks,
};

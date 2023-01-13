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

const readFile = (pathFile) => new Promise((resolve, reject) => {
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      reject(error);
    }
    resolve(data);
  });
});

const getLinks = (route) => new Promise((resolve, reject) => {
  const links = [];
  readFile(route)
    .then((data) => {
      const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
      let match = regex.exec(data);
      while (match !== null) {
        links.push({
          href: match[2],
          text: match[1],
          file: route,
        });
        match = regex.exec(data);
      }
      resolve(links);
    })
    .catch((error) => reject(error));
});

const validateLinks = (urls) => Promise.all(urls.map((arrayLinks) => fetch(arrayLinks.href)
  .then((resolve) => {
    const objResolve = {
      ...arrayLinks,
      status: resolve.status,
      ok: (resolve.ok === true) ? 'ok' : 'fail',
    };
    return objResolve;
  })
  .catch(() => ({
    ...arrayLinks,
    status: 'archivo roto',
    ok: 'fail',
  }))));

const statsLinks = (urls) => {
  const allStats = `\nTotal: ${urls.length}\nUnique:${new Set(urls.map((link) => link.href)).size}\n`;
  return allStats;
};

const statsLinksValidate = (urls) => {
  const allStatsValidate = `${statsLinks(urls)}Broken: ${urls.filter((link) => link.ok === 'fail').length}\n`;
  return allStatsValidate;
};
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
  getLinks,
  readFile,
  validateLinks,
  statsLinks,
  statsLinksValidate,
};

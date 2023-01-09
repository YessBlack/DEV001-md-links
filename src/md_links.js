const { log } = console;
const { readFile } = require('fs');
const {
  message,
  formatPath,
  validatePath,
  isAbsolute,
  convertToAbsolute,
  statDirectory,
  readDirectory,
  mdExt,
  filterMd,
} = require('./api');

const mdLinks = (route, options) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);

  if (validatePath(absolutePath)) {
    if (statDirectory(absolutePath)) {
      const filesMd = filterMd(readDirectory(absolutePath));
      filesMd.forEach((file) => {
        const pathFile = formatPath(`${absolutePath}/${file}`);
        console.log(pathFile);
      });
    } else if (absolutePath) {
      // eslint-disable-next-line no-unused-expressions
      if (mdExt(absolutePath)) {
        console.log(readFile(absolutePath, 'utf8', (err, data) => {
          if (err) throw err;
          console.log(data);
        }));
      } else {
        log(message('No es un archivo .md', 'red'));
      }
    }
  } else {
    log(message('La ruta ingresada no existe', 'red'));
  }
};

// mdLinks('pruebas/pruebaSinLinks.md');

module.exports = mdLinks;

const { log } = console;
const { readFile } = require('fs');
const {
  message,
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
      console.log(filesMd);
    } else if (absolutePath) {
      // eslint-disable-next-line no-unused-expressions
      if (mdExt(absolutePath)) {
        console.log(readFile(absolutePath));
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

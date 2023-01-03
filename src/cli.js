const fs = require('fs');
const {
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
} = require('./helpers.js');

const mdLinks = (route, options) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);

  if (validatePath(absolutePath)) {
    if (isDirectory(absolutePath)) {
      const filesMd = filterMd(readDirectory(absolutePath));
      filesMd.forEach((file) => {
        console.log(message(`Archivo: ${file}`, 'green'));
        const pathFile = formatPath(`${absolutePath}/${file}`);
        console.log(message('Links:', 'green'));
        console.log(getLinks(pathFile));
      });
    } else if (isFile(absolutePath)) {
      // eslint-disable-next-line no-unused-expressions
      mdExt(absolutePath)
        ? console.log(console.log(getLinks(absolutePath)))
        : console.log(message('No es un archivo .md', 'red'));
    }
  } else {
    console.log(message('La ruta ingresada no existe', 'red'));
  }
};

// mdLinks('pruebas/pruebaSinLinks.md');

module.exports = mdLinks;

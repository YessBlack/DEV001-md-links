const { log } = console;
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
  getLinks,
} = require('./api');

const mdLinks = (route, options) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);

  if (validatePath(absolutePath)) {
    if (isDirectory(absolutePath)) {
      const filesMd = filterMd(readDirectory(absolutePath));
      filesMd.forEach((file) => {
        log(message(`Archivo: ${file}`, 'green'));
        const pathFile = formatPath(`${absolutePath}/${file}`);
        log(message('Links:', 'green'));
        log(getLinks(pathFile));
      });
    } else if (isFile(absolutePath)) {
      // eslint-disable-next-line no-unused-expressions
      mdExt(absolutePath)
        ? log(console.log(getLinks(absolutePath)))
        : log(message('No es un archivo .md', 'red'));
    }
  } else {
    log(message('La ruta ingresada no existe', 'red'));
  }
};

// mdLinks('pruebas/pruebaSinLinks.md');

module.exports = mdLinks;

const { log } = console;
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
  getLinks,
} = require('./api');

const mdLinks = (route, options) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);

  if (validatePath(absolutePath)) {
    if (statDirectory(absolutePath)) {
      const filesMd = filterMd(readDirectory(absolutePath));
      filesMd.forEach((file) => {
        const pathFile = formatPath(`${absolutePath}/${file}`);
        getLinks(pathFile)
          .then((links) => {
            if (links.length !== 0) {
              log(message(`Archivo: ${file}`, 'orange'));
              log(message('Links:', 'green'));
              log(links);
            }
          });
      });
    } else if (absolutePath) {
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

const {
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

const getPathFile = (route) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);
  if (validatePath(absolutePath)) {
    if (statDirectory(absolutePath)) {
      const filesMd = filterMd(readDirectory(absolutePath));
      const arrPathFiles = filesMd.map((file) => formatPath(`${absolutePath}/${file}`));
      return arrPathFiles;
    } if (absolutePath) {
      if (mdExt(absolutePath)) {
        return [absolutePath];
      }
    }
  }
};

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (validatePath(route)) {
    if (options.validate === false) {
      const pathFile = getPathFile(route);
      pathFile.forEach((file) => {
        resolve(getLinks(file));
      });
    }
  } else {
    reject(new Error('La ruta no existe'));
  }
});

module.exports = mdLinks;

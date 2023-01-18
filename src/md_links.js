const {
  formatPath,
  validatePath,
  isAbsolute,
  convertToAbsolute,
  statDirectory,
  readDirectory,
  mdExt,
  getLinks,
  validateLinks,
  statsLinks,
  statsLinksValidate,
} = require('./api');

// eslint-disable-next-line consistent-return
const getPathFile = (route, arrOfFiles = []) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);
  if (validatePath(absolutePath)) {
    // Dir
    if (statDirectory(absolutePath)) {
      const files = readDirectory(absolutePath);
      files.forEach((file) => {
        const stat = statDirectory(formatPath(`${absolutePath}/${file}`));
        if (stat) {
          getPathFile(formatPath(`${absolutePath}/${file}`), arrOfFiles);
        } else {
          arrOfFiles.push(formatPath(`${absolutePath}/${file}`));
        }
      });
      return arrOfFiles.filter((file) => mdExt(file));
    }
    // file
    if (mdExt(absolutePath)) {
      return [absolutePath];
    }
  }
};

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  const pathFile = getPathFile(route);
  const links = Promise.all(pathFile.map((file) => getLinks(file)));

  if (validatePath(route)) {
    if (options.validate === false) {
      resolve(links.then((res) => res.flat()));
      return;
    }
    if (options.stats === true && options.validate === true) {
      const validateStatusLinks = links.then((data) => validateLinks(data.flat()));
      const validate = validateStatusLinks.then((data) => statsLinksValidate(data.flat()));
      resolve(validate);
      return;
    }
    if (options.validate === true) {
      const validate = links.then((data) => validateLinks(data.flat()));
      resolve(validate);
      return;
    }
    if (options.stats === true) {
      const validate = links.then((data) => statsLinks(data.flat()));
      resolve(validate);
    }
  } else {
    reject(new Error('La ruta no existe'));
  }
});

module.exports = { getPathFile, mdLinks };

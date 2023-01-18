const {
  formatPath,
  validatePath,
  isAbsolute,
  convertToAbsolute,
  statDirectory,
  readDirectory,
  isMdFile,
  getLinks,
  validateLinks,
  statsLinks,
  statsLinksValidate,
} = require('./api');

// eslint-disable-next-line consistent-return
const getPathFile = (route) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);
  const arrOfFiles = [];
  if (validatePath(absolutePath)) {
    // Dir
    if (statDirectory(absolutePath)) {
      const files = readDirectory(absolutePath);
      files.forEach((file) => {
        const stat = statDirectory(formatPath(`${absolutePath}/${file}`));
        if (stat) {
          getPathFile(formatPath(`${absolutePath}/${file}`)).forEach((fileSub) => arrOfFiles.push(fileSub));
        } else {
          arrOfFiles.push(formatPath(`${absolutePath}/${file}`));
        }
      });
      return arrOfFiles.filter((file) => isMdFile(file));
    }
    // file
    if (isMdFile(absolutePath)) {
      return [absolutePath];
    }
  }
};

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  const absolutePath = isAbsolute(route) ? route : convertToAbsolute(route);
  if (validatePath(absolutePath)) {
    const pathFile = getPathFile(route);
    const links = Promise.all(pathFile.map((file) => getLinks(file)));

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
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('La ruta no existe');
  }
});

module.exports = { getPathFile, mdLinks };

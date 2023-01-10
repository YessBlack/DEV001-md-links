const { log } = console;
const {
  validatePath,
  getLinks,
  getPathFile,
} = require('./api');

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (validatePath(route)) {
    const pathFile = getPathFile(route);
    console.log(pathFile);
    pathFile.forEach((file) => {
      getLinks(file)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
    // const arrLinks = pathFile.map((file) => getLinks(file));
    // resolve(arrLinks);
  }
});

// mdLinks('pruebas/pruebaSinLinks.md');

module.exports = mdLinks;

// eslint-disable-next-line no-undef
const mdLinks = jest.fn(() => {
  if ('home/usuario/Documentos/XFiles') {
    return Promise.reject('La ruta no existe');
  }
});

module.exports = mdLinks;

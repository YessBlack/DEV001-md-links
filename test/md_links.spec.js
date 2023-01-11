/* eslint-disable no-undef */
const mdLinks = require('../src/md_links');

jest.mock('../src/md_links');

describe('mdLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Deberia retornar un error si la ruta no existe', async () => {
    await expect(mdLinks('home/usuario/Documentos/XFils')).rejects.toEqual('La ruta no existe');
  });
});

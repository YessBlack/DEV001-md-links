/* eslint-disable no-undef */
const { convertToAbsolute, formatPath } = require('../src/api');
const { getPathFile, mdLinks } = require('../src/md_links');

const pathFile = formatPath(convertToAbsolute('test/mockData/'));

const arrayPath = [
  `${formatPath(convertToAbsolute('test/mockData'))}/otroDirectorio/directoriosPrueba/chau.md`,
  `${formatPath(convertToAbsolute('test/mockData'))}/otroDirectorio/node.md`,
  `${formatPath(convertToAbsolute('test/mockData'))}/pruebaConLinks.md`,
  `${formatPath(convertToAbsolute('test/mockData'))}/pruebaSinLinks.md`,
];

describe('getPathFile', () => {
  it('Deberia retornar un array de rutas de archivos .md Si paso un directorio con ruta absoluta', () => {
    expect(getPathFile(pathFile)).toEqual(arrayPath);
  });

  it('Deberia retornar un array de rutas de archivos .md Si paso un directorio con ruta relativa', () => {
    expect(getPathFile('test/mockData')).toEqual(arrayPath);
  });

  it('Deberia retornar un array de rutas de archivos .md Si paso un archivo .md', () => {
    const arr = [
      `${pathFile}/pruebaConLinks.md`,
    ];

    expect(getPathFile(`${pathFile}/pruebaConLinks.md`)).toEqual(arr);
  });
});

describe('mdLinks', () => {
  beforeAll(() => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ status: 200, ok: true })
      .mockResolvedValueOnce({ status: 400, ok: false })
      .mockRejectedValueOnce({ status: 'link roto', ok: false });
    global.fetch = mockFetch;
  });

  it('Deberia retornar una promesa', () => {
    expect(mdLinks('test/mockData', { validate: false })).toBeInstanceOf(Promise);
  });

  it('Deberia retornar un array de objetos con las propiedades href, text y file', () => {
    const arr = [
      {
        href: 'https://www.twitch.tv/midudev',
        text: 'Twitch',
        file: `${pathFile}/pruebaConLinks.md`,
      },
    ];
    return mdLinks(arrayPath[2], { validate: false }).then((res) => expect(res).toEqual(arr));
  });

  it('Deberia devolver un array de objetos con las propiedades href, text, file y status', () => {
    const arr = [
      {
        file: `${pathFile}/pruebaConLinks.md`,
        href: 'https://www.twitch.tv/midudev',
        status: 200,
        ok: 'ok',
        text: 'Twitch',
      },
    ];
    return mdLinks(arrayPath[2], { validate: true }).then((res) => expect(res).toEqual(arr));
  });

  it('Deberia devolver un string con estadisticas', () => {
    const arr = '\nTotal: 1\nUnique: 1\n';
    return mdLinks(arrayPath[2], { stats: true }).then((res) => expect(res).toEqual(arr));
  });

  it('Deberia devolver un string con estadisticas y validacion', () => {
    const arr = '\nTotal: 1\nUnique: 1\nBroken: 1\n';
    // eslint-disable-next-line max-len, max-len
    return mdLinks(arrayPath[2], { stats: true, validate: true }).then((res) => expect(res).toEqual(arr));
  });

  it('Deberia devolver error si la ruta no existe', () => {
    const messageError = 'La ruta no existe';
    return mdLinks('test/mockData/otroDir/', { validate: false }).catch((err) => expect(err).toEqual(messageError));
  });
});

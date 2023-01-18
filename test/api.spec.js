/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const {
  message,
  formatPath,
  validatePath,
  isAbsolute,
  convertToAbsolute,
  statDirectory,
  readDirectory,
  isMdFile,
  readFile,
  getLinks,
  validateLinks,
  statsLinks,
  statsLinksValidate,
} = require('../src/api');

jest.mock('fs');
jest.mock('path');
jest.mock('chalk', () => ({
  keyword: jest.fn(() => jest.fn((text) => text)),
}));

describe('message', () => {
  it('Deberia llamar a chalk.keyword', () => {
    message('Hola', 'red');
    expect(chalk.keyword).toHaveBeenCalled();
  });
});

describe('formatPath', () => {
  it('Deberia retornar el path con /', () => {
    expect(formatPath('home\\Documents\\DEV001-md-links\\test\\test.md')).toBe('home/Documents/DEV001-md-links/test/test.md');
  });
});

describe('validatePath', () => {
  it('Deberia llamar a fs.existsSync', () => {
    validatePath('./test/test.md');
    expect(fs.existsSync).toHaveBeenCalled();
  });

  it('Deberia retornar true si el path existe', () => {
    fs.existsSync.mockImplementationOnce(() => true);
    expect(validatePath('README.md')).toBe(true);
  });
});

describe('isAbsolute', () => {
  it('Deberia llamar a path.isAbsolute', () => {
    isAbsolute('./test/test.md');
    expect(path.isAbsolute).toHaveBeenCalled();
  });

  it('Deberia retornar true si el path es absoluto', () => {
    path.isAbsolute.mockImplementationOnce(() => true);
    expect(isAbsolute('README.md')).toBe(true);
  });
});

describe('convertToAbsolute ', () => {
  it('Deberia llamar a path.resolve', () => {
    convertToAbsolute('./test/test.md');
    expect(path.resolve).toHaveBeenCalled();
  });

  it('Deberia retornar el path absoluto', () => {
    path.resolve.mockImplementationOnce(() => 'home/Documents/DEV001-md-links/test/test.md');
    expect(convertToAbsolute('./test/test.md')).toBe('home/Documents/DEV001-md-links/test/test.md');
  });
});

describe('statDirectory', () => {
  it('Deberia retornar true si es un directorio', () => {
    fs.statSync.mockImplementationOnce(() => ({ isDirectory: () => true }));
    expect(statDirectory('./test/test.md')).toBe(true);
  });
});

describe('readDirectory', () => {
  it('Deberia llamar a fs.readdirSync', () => {
    readDirectory('./test/test.md');
    expect(fs.readdirSync).toHaveBeenCalled();
  });

  it('Deberia retornar un array de archivos', () => {
    fs.readdirSync.mockImplementationOnce(() => ['test.md']);
    expect(readDirectory('./test/test.md')).toEqual(['test.md']);
  });
});

describe('mdExt', () => {
  it('Deberia retornar true si el archivo es .md', () => {
    path.extname.mockImplementationOnce(() => '.md');
    expect(isMdFile('test.md')).toBe(true);
  });
});

describe('readFile', () => {
  it('Debería llamar a fs.readFile', () => {
    readFile();
    expect(fs.readFile).toHaveBeenCalled();
  });

  it('Debería retornar una promesa', () => {
    expect(readFile()).toBeInstanceOf(Promise);
  });

  it('Debería retornar una promesa resuelta si el path existe', () => {
    fs.readFile.mockImplementationOnce((path, callback) => callback(null, 'Hola'));
    expect(readFile('./test/test.md')).resolves.toEqual('Hola');
  });

  it('Debería retornar una promesa rechazada si el path no existe', () => {
    fs.readFile.mockImplementationOnce((path, callback) => callback('Error', null));
    expect(readFile('./test/test.md')).rejects.toEqual('Error');
  });
});

describe('getLinks', () => {
  it('Deberia llamar a fs.readFile', () => {
    getLinks();
    expect(fs.readFile).toHaveBeenCalled();
  });

  it('Deberia retornar una promesa', () => {
    expect(getLinks()).toBeInstanceOf(Promise);
  });

  it('Deberia retornar un array de objetos con los links', () => {
    const array = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'home/Documents/DEV001-md-links/test/test.md',
      },
    ];
    fs.readFile.mockImplementationOnce((path, callback) => callback(null, '[Node.js](https://nodejs.org/es/)'));
    expect(getLinks('home/Documents/DEV001-md-links/test/test.md')).resolves.toEqual(array);
  });

  it('Deberia retornar una promesa rechazada', () => {
    fs.readFile.mockImplementationOnce((path, callback) => callback('Error', null));
    expect(getLinks('home/Documents/DEV001-md-links/test/test.md')).rejects.toEqual('Error');
  });
});

describe('validateLinks', () => {
  beforeAll(() => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ status: 200, ok: true })
      .mockResolvedValueOnce({ status: 400, ok: false })
      .mockRejectedValueOnce({ status: 'link roto', ok: false });
    global.fetch = mockFetch;
  });

  it('Deberia devolver un arreglo de promesas con status 200', () => {
    const arrAgs = [{ href: 'dev.co' }];
    const arrRes = [{ href: 'dev.co', status: 200, ok: 'ok' }];
    return validateLinks(arrAgs).then((res) => expect(res).toEqual(arrRes));
  });

  it('Deberia retornar un arreglo de promesas con status 400', () => {
    const arrAgs = [{ href: 'dev.co' }];
    const arrRes = [{ href: 'dev.co', status: 400, ok: 'fail' }];
    return validateLinks(arrAgs).then((res) => expect(res).toEqual(arrRes));
  });

  it('Deberia retornar un arreglo de promesas con status link roto', () => {
    const arrAgs = [{ href: 'lab.co' }];
    const arrRes = [{ href: 'lab.co', status: 'archivo roto', ok: 'fail' }];
    return validateLinks(arrAgs).catch((res) => expect(res).toEqual(arrRes));
  });
});

describe('statsLinks', () => {
  it('Deberia retornar un string con las estadisticas', () => {
    const arr = [
      {
        file: 'home/Documents/DEV001-md-links/test/test.md',
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
      },
    ];
    expect(statsLinks(arr)).toEqual('\nTotal: 1\nUnique: 1\n');
  });
});

describe('statsValidateLinks', () => {
  it('Deberia retornar un string con las estadisticas', () => {
    const arr = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'home/Documents/DEV001-md-links/test/test.md',
        status: 200,
        statusText: 'ok',
      },
    ];
    expect(statsLinksValidate(arr)).toEqual('\nTotal: 1\nUnique: 1\nBroken: 0\n');
  });
});

// afterAll(() => {
//   global.fetch = unmockedFetch;
// });

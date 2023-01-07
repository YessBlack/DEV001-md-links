/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const {
  validatePath,
  isAbsolute,
  convertToAbsolute,
  statDirectory,
  readFile,
} = require('../src/api');

jest.mock('fs');
jest.mock('path');

describe('validatePath', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof validatePath).toBe('function');
  });

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
  it('Deberia ser una funcion', () => {
    expect(typeof isAbsolute).toBe('function');
  });

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
  it('Deberia ser una funcion', () => {
    expect(typeof convertToAbsolute).toBe('function');
  });

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
  it('Deberia ser una funcion', () => {
    expect(typeof statDirectory).toBe('function');
  });

  it('Deberia retornar true si es un directorio', () => {
    fs.statSync.mockImplementationOnce(() => ({ isDirectory: () => true }));
    expect(statDirectory('./test/test.md')).toBe(true);
  });
});

describe('readFile', () => {
  it('debería er una función', () => {
    expect(typeof readFile).toBe('function');
  });

  it('Debería llamar a fs.readFile', () => {
    readFile();
    expect(fs.readFile).toHaveBeenCalled();
  });

  it('Debería retornar una promesa', () => {
    expect(readFile()).toBeInstanceOf(Promise);
  });

  it('Debería retornar una promesa resuelta si el path existe', async () => {
    fs.readFile.mockImplementationOnce((path, callback) => callback(null, 'Hola'));
    await expect(readFile('./test/test.md')).resolves.toEqual('Hola');
  });
});

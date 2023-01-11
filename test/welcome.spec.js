/* eslint-disable no-undef */
const { mdLiksMessage, welcome } = require('../src/welcome');

describe('mdLiksMessage', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLiksMessage).toBe('function');
  });

  it('Debería retornar un string', () => {
    expect(typeof mdLiksMessage()).toBe('string');
  });
});

describe('welcome', () => {
  it('Debería ser una función', () => {
    expect(typeof welcome).toBe('function');
  });
});

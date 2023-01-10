/* eslint-disable no-undef */
const welcome = require('../src/welcome');

describe('welcome', () => {
  it('is a function', () => {
    expect(typeof welcome).toBe('function');
  });

  it('Deberia retornar texto', () => {
    expect(welcome()).toBe('Welcome to md-links!');
  });
});

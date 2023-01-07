const welcome = require('../src/welcome');

describe('welcome', () => {
  it('is a function', () => {
    expect(typeof welcome).toBe('function');
  });
});

const mdLinks = require('./cli.js');
const welcome = require('./welcome.js');

welcome();
process.stdout.write('Ingrese la ruta del archivo que desea analizar: ');
process.stdin.on('data', (data) => {
  const route = data.toString().trim();
  mdLinks(route);
});

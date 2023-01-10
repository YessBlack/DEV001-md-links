const fs = require('fs');

console.log('Primer asincrono');
console.log('');
fs.readFile('C:\\Users\\attry\\Desktop\\Proyecto\\DEV001-md-links\\directoriosPrueba\\hola.md', 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
    console.log('');
  } else {
    console.log(data);
    console.log('');
  }
});

// Bloque de leida de archivos sincrono
// const archivo = fs.readFileSync('README.md', 'utf-8');
console.log('Segundo asincrono');
console.log('');
fs.readFile('./pruebas/pruebaConLinks.md', 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
    console.log('');
  } else {
    console.log(data);
    console.log('');
  }
});

// -------------------------------------- LEER DIRECTORIOS------------------------------------//
const dirSync = fs.readdirSync('./pruebas');
console.log('Primer sincrono');
console.log('');
console.log(dirSync);

console.log('Tercer asincrono');
console.log('');
fs.readdir('C:\\Users\\attry\\Desktop\\Proyecto\\DEV001-md-links\\directoriosPrueba\\hola.md', (error, data) => {
  if (error) {
    console.log(error);
    console.log('');
  } else {
    console.log(data);
    console.log('');
  }
});

console.log('Fin del programa');

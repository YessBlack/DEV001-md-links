const { message } = require('./api');

const { log } = console;
const mdLinks = require('./md_links');
const help = require('./help');
const welcome = require('./welcome');

const mdLinksExe = () => {
  welcome();
  process.stdout.write(message('> ', 'cyan'));
  process.stdin.on('data', (data) => {
    const route = data.toString().trim();
    const options = route.split(' ');
    // eslint-disable-next-line no-unused-expressions
    if (options[0] === 'md-links' && options.length === 1) {
      log(message('Por favor incluya la ruta', 'red'));
    } else if (options[0] === 'md-links' && options[1]) {
      if (options[2] === '--exit') {
        mdLinks(options[1]);
        process.exit();
      }
      if (options[2] === '--help') {
        help();
      }
      if (!options[2]) {
        mdLinks(options[1]);
      }
    } else {
      log(message('Comando no reconocido', 'red'));
    }
    process.stdout.write(message('> ', 'cyan'));
  });
};

module.exports = mdLinksExe;

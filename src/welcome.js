const figlet = require('figlet');
const chalk = require('chalk');
const { message } = require('./api');

const { log } = console;

const welcome = () => {
  log(
    chalk.keyword('orange')(
      figlet.textSync('< md_links >', { horizontalLayout: 'full' }),
    ),
  );
  log('');
  log(chalk.bold.blue('.:.:.:. Herramienta para validar links de archivos .md .:.:.:.'));
  log();
  log('');
  log(chalk.bgRed('Para comenzar a usar md-links, ten en cuenta las siguientes instrucciones:'));
  log('');
  log(message('1. Ingresa el comando md-links seguido de la ruta del archivo que deseas analizar.', 'green'));
  log('');
  log(message('2. Si deseas validar los links, agrega la opción --validate.', 'green'));
  log('');
  log(message('3. Si deseas obtener estadísticas de los links, agrega la opción --stats.', 'green'));
  log('');
  log(message('4. Si deseas obtener estadísticas de los links y validarlos, agrega las opciones --stats y --validate.', 'green'));
  log('');
  log(message('5. Si deseas obtener ayuda, agrega la opción --help.', 'green'));
  log('');
  log(message('6. Si deseas salir, agrega la opcion --exit', 'green'));
  log('');
  log(chalk.bgRed('¡Listo! Ya puedes comenzar a usar md-links.'));
  log('');
};

module.exports = welcome;

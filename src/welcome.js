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
  log(chalk.green('1. Ingresa el comando md-links seguido de la ruta del archivo que deseas analizar.'));
  log('');
  log(chalk.green('2. Si deseas validar los links, agrega la opción --validate.'));
  log('');
  log(chalk.green('3. Si deseas obtener estadísticas de los links, agrega la opción --stats.'));
  log('');
  log(chalk.green('4. Si deseas obtener estadísticas de los links y validarlos, agrega las opciones --stats y --validate.'));
  log('');
  log(message('Ejemplo: md-links ./some/example.md --validate --stats', 'cyan'));
  log('');
};

module.exports = welcome;

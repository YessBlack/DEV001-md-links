const figlet = require('figlet');
const chalk = require('chalk');

const log = console.log;

const welcome = () => {
  log(
    chalk.keyword('orange')(
      figlet.textSync('< md_links > \n', { horizontalLayout: 'full' }),
    ),
  );
  log(chalk.bold.blue('\n .:.:.:. Herramienta para validar links de archivos .md .:.:.:. \n'));
  log(chalk.bgRed('Para comenzar a usar md-links, ten en cuenta las siguientes instrucciones: \n'));
  log(chalk.green('1. Ingresa el comando md-links seguido de la ruta del archivo que deseas analizar. \n'));
  log(chalk.green('2. Si deseas validar los links, agrega la opción --validate. \n'));
  log(chalk.green('3. Si deseas obtener estadísticas de los links, agrega la opción --stats. \n'));
  log(chalk.green('4. Si deseas obtener estadísticas de los links y validarlos, agrega las opciones --stats y --validate. \n'));
};

module.exports = welcome;

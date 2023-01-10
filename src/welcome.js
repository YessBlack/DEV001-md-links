const figlet = require('figlet');
const chalk = require('chalk');
const { message } = require('./api');

const { log } = console;

const welcome = () => {
  log(
    chalk.keyword('orange')(
      figlet.textSync('< md_links >\n', { horizontalLayout: 'full' }),
    ),
  );
  log(message('\n.:.:.:. Herramienta para validar links de archivos Markdown .:.:.:. \n', 'blue'));
  log(chalk.bgRed('Para comenzar a usar md-links, ten en cuenta las siguientes instrucciones: \n'));
  log(message('1. Ingresa el comando md-links seguido de la ruta del archivo que deseas analizar. \n', 'green'));
  log(message('2. Si deseas validar los links, agrega la opción --validate. \n', 'green'));
  log(message('3. Si deseas obtener estadísticas de los links, agrega la opción --stats. \n', 'green'));
  log(message('4. Si deseas obtener estadísticas de los links y validarlos, agrega las opciones --stats y --validate. \n', 'green'));
  log(message('5. Si deseas obtener ayuda, agrega la opción --help. \n', 'green'));
  log(message('6. Si deseas salir, agrega la opcion --exit \n', 'green'));
  log(chalk.bgRed('¡Listo! Ya puedes comenzar a usar md-links. \n'));
};

module.exports = welcome;

const figlet = require('figlet');
const chalk = require('chalk');

const { log } = console;

const help = () => {
  log(
    chalk.keyword('orange')(
      figlet.textSync('Help me!', { horizontalLayout: 'full' }),
    ),
  );
};

module.exports = help;

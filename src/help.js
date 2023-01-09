const figlet = require('figlet');
const chalk = require('chalk');
const { message } = require('./api');

const { log } = console;

const help = () => {
  log(
    chalk.keyword('orange')(
      figlet.textSync('Help me!', { horizontalLayout: 'full' }),
    ),
  );
};

module.exports = help;

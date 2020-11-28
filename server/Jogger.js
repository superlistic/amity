const chalk = require('chalk');

class Jogger {
  constructor(identifier, colorIndex) {
    colorIndex = colorIndex;

    this.identifier = '[' + identifier + ']';
  }
  err(msg = '', plain = '') {
    console.log(
      chalk.red(this.identifier),
      chalk.underline(chalk.redBright(msg), plain)
    );
  }
  ok(msg = '', plain = '') {
    console.log(chalk.green(this.identifier), chalk.greenBright(msg), plain);
  }
  warn(msg = '', plain = '') {
    console.log(chalk.yellow(this.identifier), chalk.yellowBright(msg), plain);
  }
  mute(msg = '', plain = '') {
    console.log(chalk.grey(this.identifier), chalk.grey(msg), plain);
  }
  sub(msg = '', plain = '') {
    console.log(chalk.grey(this.identifier), msg, plain);
  }
  info(msg = '', plain = '') {
    console.log(this.identifier, msg, plain);
  }
  info2(msg = '', plain = '') {
    console.log(chalk.cyan(this.identifier), chalk.cyanBright(msg), plain);
  }
  info3(msg = '', plain = '') {
    console.log(
      chalk.magenta(this.identifier),
      chalk.magentaBright(msg),
      plain
    );
  }
  info4(msg = '', plain = '') {
    console.log(chalk.blue(this.identifier), chalk.blueBright(msg), plain);
  }
  debug(msg = '', plain = '') {
    console.log(
      chalk.bgRed(chalk.black(this.identifier)),
      chalk.red(msg),
      plain
    );
  }
}

module.exports = Jogger;

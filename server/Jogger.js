const chalk = require('chalk');

class Jogger {
  constructor(identifyer = '') {
    this.identifier = identifyer;
  }
  err(msg = '', plain = '') {
    console.log(this.identifier, chalk.underline(chalk.redBright(msg), plain));
  }
  ok(msg = '', plain = '') {
    console.log(this.identifier, chalk.greenBright(msg), plain);
  }
  warn(msg = '', plain = '') {
    console.log(this.identifier, chalk.yellowBright(msg), plain);
  }
  mute(msg = '', plain = '') {
    console.log(this.identifier, chalk.grey(msg), plain);
  }
  sub(msg = '', plain = '') {
    console.log(this.identifier, msg, plain);
  }
  info(msg = '', plain = '') {
    console.log(this.identifier, msg, plain);
  }
  info2(msg = '', plain = '') {
    console.log(this.identifier, chalk.cyanBright(msg), plain);
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
      chalk.bgRed(chalk.black('-DEBUG LOG-')),
      this.identifier,
      chalk.red(msg),
      plain
    );
  }
}

module.exports = Jogger;

const tests = [];

class AssertionError extends Error {
  constructor(message) {
    super(message);
  }
}

const it = (message, test) => {
  try {
    test();
    tests.push(true);
    console.log(`  \x1b[0m\x1b[32m✔ \x1b[37m\x1b[2m${message}`);
  } catch (err) {
    tests.push(false);
    console.log(`  \x1b[0m\x1b[31m✘ ${message}`);
    if (err instanceof AssertionError) {
      console.log(`      \x1b[37m${err.message}\n`);
    } else {
      console.log('')
      console.error(err);
      process.exit(1);
    }
  }
};

const equal = (actual, expected) => {
  if (actual !== expected) {
    throw new AssertionError(`\x1b[0m\x1b[37m${JSON.stringify(actual)}\x1b[0m\x1b[37m\x1b[2m is not equal to \x1b[0m\x1b[32m${JSON.stringify(expected)}`);
  }
};


module.exports = { it, equal };

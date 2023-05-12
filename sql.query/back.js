
const inquirer = require('inquirer');
const  init  = require('../index.js');

const back = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'choice',
      message: 'Press any key to go back',
    },
  ]).then(() => {
    init();
  });
};

const handleBack = () => {
  return back().then(() => {
    init();
  });
};

module.exports = back;

//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

//SQL connections
const db = require('./db/connections.js');

//SQL queries, i have learnt that i hate sql query's with a passion. thanks for coming to my TedTalk
const allEmp = require('./sql.query/allEmp.js');
const empDept = require('./sql.query/empDept.js');
const empMan = require('./sql.query/empMan.js');
const allRoles = require('./sql.query/allRoles.js');
const allDept = require('./sql.query/allDept.js');
const addEmp = require('./sql.query/addEmp.js');

console.log('index connect');

const back = () => { //i wanted to make this a function on another file like the other queries but it kept giving me errors :<
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


const init = () => {
  console.log('init');
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Employees By Department',
          'View All Employees By Manager',
          'View All Roles',
          'View All Departments',
          'Add Employee',
          'Remove Employee',
          'Add Department',
          'Add Role',
          'Quit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice){
        case 'Quit': console.log('Goodbye'); process.exit(); 
        
        case 'View All Employees': allEmp().then(() => back());
          break;
        case 'View All Employees By Department': empDept().then(() => back());;
          break;
        case 'View All Employees By Manager': empMan().then(() => back());;
          break;
        case 'View All Roles': allRoles().then(() => back());;
          break;
        case 'View All Departments': allDept().then(() => back());;
          break;
        case 'Add Employee': addEmp().then(() => back());;
          break;


       }
    });
}; 

module.exports = init;
init();

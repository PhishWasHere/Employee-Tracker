
//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

//SQL connections
const db = require('./config/connection.js');

//put all the queries into a single file
const query = require('./query/index.js');  

console.log('index connect');

const back = () => { //i wanted to make this a function on another file like the other queries but it kept giving me errors :<
  return inquirer.prompt([
    {
      type: 'input',
      name: 'choice',
      message: 'Press any key to go back',
    },
  ]).then(() => {
    init(); //i didnt know how to properly intergrate this bit
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
        
        case 'View All Employees': query.allEmp().then(() => back());
          break;
        case 'View All Employees By Department': query.empDept().then(() => back());;
          break;
        case 'View All Employees By Manager': query.empMan().then(() => back());;
          break;
        case 'View All Roles': query.allRoles().then(() => back());;
          break;
        case 'View All Departments': query.allDept().then(() => back());;
          break;
        case 'Add Employee': query.addEmp().then(() => back());;
          break;
        case 'Remove Employee': query.delEmp().then(() => back());;
          break;
        case 'Add Department': query.addDept().then(() => back());;
          break;
        case 'Add Role': query.addRole().then(() => back());;
          break;
       }
    });
}; 

init();

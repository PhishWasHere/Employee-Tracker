const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const promptQuery = require('./js/allEmp.js');
const { allEmp, empDept } = require('./js/allEmp.js');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '1234',
    database: 'employees'
  },
  console.log(`Connected to the employees database.`)
);

const init = () => {
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
          'Add Employee',
          'Remove Employee',
          'View All Roles',
          'View All Departments',
          'Quit',
        ],
        when: (answers) => answers.choice !== 'Quit',
      },
    ])
    .then((answers) => {
      if (answers.choice === 'View All Employees') {
        // Handle the "View All Employees" choice
        allEmp()
          .then(() => {
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'choice',
                  message: 'Would you like to go back?',
                  choices: ['Yes']
                },
              ])
              .then((answers) => {
                  // If the user selects "Yes", call the "init" function again to show the main menu
                  init();
              });
          })
          .catch((err) => console.log(err));
      } else if (answers.choice === 'View All Employees By Department') {
        // Handle the "View All Employees By Department" choice
        empDept()
          .then(() => {
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'choice',
                  message: 'Would you like to go back?',
                  choices: ['Yes']
                }, 
              ])
              .then((answers) => {
                init();
              });
          })
      } else if (answers.choice === 'View All Employees By Manager') {
        // Handle the "View All Employees By Manager" choice
        db.query('SELECT * FROM employees WHERE manager = ?', function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(results);
        });
      } else if (answers.choice === 'Add Employee') {
        // Handle the "Add Employee" choice
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'What is your first name?',
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'What is your last name?',
            },
            {
              type: 'input',
              name: 'role',
              message: 'What is your role?',
            },
            {
              type: 'list',
              name: 'manager',
              message: 'Who is your manager?',
              choices: [
                'Marl Miller',
                'Mike Miller',
                'May Miller',
                'Molly Miller',
              ],
            },
          ]).then((answers) => {
            db.query('INSERT INTO employees (first_name, last_name, role, manager) VALUES (?, ?, ?, ?)', [answers.first_name, answers.last_name, answers.role, answers.manager], function (err, results) {
              if (err) {
                console.log(err);
              }
              console.log(results);
            });
          });
      } else if (answers.choice === 'Remove Employee') {
        // Handle the "Remove Employee" choice
        console.log('enter the first and last name of the employee you wish to remove');
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'remove',
              message: 'Which employee would you like to remove?',
            },
          ]).then((answers) => {
            db.query('DELETE FROM employees WHERE first_name = ? AND last_name = ?', [answers.remove], function (err, results) {
              if (err) {
                console.log(err);
              }
              console.log(results);
            });
          });
      } else if (answers.choice === 'View All Roles') {
        // Handle the "View All Roles" choice
        db.query('SELECT * FROM roles', function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(results);
        });
      } else if (answers.choice === 'View All Departments') {
        // Handle the "View All Departments" choice
        db.query('SELECT * FROM departments', function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(results);
        });
      } else {
        console.log('Goodbye!');
        process.exit(0);
      }
    })
    .catch((err) => console.log(err));
};

init();
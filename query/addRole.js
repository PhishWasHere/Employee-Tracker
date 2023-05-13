const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../db/connections.js');

const addRole = async () => {
    console.log('addRole');
    try {
        const dept = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM departments`, function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role\'s title? (type "quit" to cancel)',
                // for the life of me i couldnt get this to work
                // validate: function (input) {
                //     if (input.toLowerCase() === 'quit') {
                //         back();
                //     } else {
                //         return true;
                //     }
                // },
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the role\'s salary? (type "quit" to cancel)',
                // i tried using .mjs and other export methods, but i ran out of time to figure it out :<
                // validate: function(input){
                //     if (input.toLowerCase() === 'quit') {
                //         return;
                //     } else if (!isNaN(input)) {
                //         return true;
                //     } else { 
                //         return 'Please enter a valid number or "quit"';
                //     }
                // },
            },
            {
                type: 'list',
                name: 'dept_id',
                message: 'What department is this role in?',
                choices: dept.map((dept) => {
                    return {
                        name: dept.name,
                        value: dept.id,
                    };
                }),
            },
        ])
        const deptID = await new Promise((resolve, reject) => {
            db.query(`
                SELECT id FROM departments WHERE id = ?`,
                [answers.dept_id], function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.id);
                    }
                });
        });

        const role = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
                [answers.title, answers.salary, answers.dept_id], function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });

        console.log(`Added role ${answers.title} with salary ${answers.salary} to roles ${deptID}.`);
    } catch (err) {
        console.log(err.stack);
        throw new Error('Error adding role');
    }
};

module.exports = addRole;

const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../db/connections.js');

const allEmp = async () => {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM employees.all_employees;', function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.log(results);
        return results;
    } catch (err) {
        console.log(err);
        throw new Error('Error retrieving employees');
    }
};



const empDept = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to view?',
                choices: ['accountant', 'legal', 'logistics', 'IT', 'sales']
            }
        ]);
        const results = await new Promise((resolve, reject) => {
            db.query('SELECT all_employees.id, all_employees.first_name, all_employees.last_name, roles.salary FROM all_employees JOIN roles ON all_employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE departments.name = ?',
            [answers.department], function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.log(results);
        return results;
    } catch (err) {
        console.log(err);
        throw new Error('Error retrieving employees');
    }
};


const query = [allEmp, empDept];

module.exports = query; 

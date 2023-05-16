const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../config/connection.js');

const empDept = async () => {
    try {

        const departments = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM departments', function (err, results) {    
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to view?',
                choices: departments.map((dept) => {
                    return {
                        name: dept.name,
                        value: dept.id,
                    };
                }),
            }
        ]); 
        const results = await new Promise((resolve, reject) => {
            db.query(`
            SELECT e.id, e.first_name, e.last_name
            FROM all_employees AS e
            JOIN roles AS r ON e.role_id = r.id
            WHERE r.department_id = ?`,
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
        throw new Error('Error retrieving employees/department data');
    }
};

module.exports = empDept;
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../db/connections.js');

const addEmp = async () => {
    console.log('addEmp');
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employee\'s last name?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the employee\'s role?',
                choices: ['accountant', 'HR', 'logistics', 'IT', 'sales']
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employee\'s manager?',
                choices: ['Marl Miller', 'Mike Miller', 'May Miller', 'Molly Miller', 'NULL']
            }
        ]);
        console.log(answers);
        const role_id = await new Promise((resolve, reject) => {
            db.query(`
                SELECT id FROM roles WHERE title = ?`,
            [answers.role], function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].id);
                }
            });
        });
        const manager_id = await new Promise((resolve, reject) => {
            if (answers.manager === 'NULL') {
                resolve(null);
            } else {
                db.query(`
                    SELECT id FROM managers WHERE last_name = ?`,
                [answers.manager.split(' ')[1]], function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0].id);
                    }
                });
            }
        });
        db.query(`
            INSERT INTO all_employees (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`,
        [answers.first_name, answers.last_name, role_id, manager_id], function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log('Employee added');
            }
        });
    } catch (err) {
        console.log(err);
        throw new Error('Error adding employee');
    }
};

module.exports = addEmp;
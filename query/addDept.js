const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../config/connection.js');

const addDept = async () => {
    console.log('addEmp');
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the depertments name?',
            },
        ]);
        console.log(answers);
        const role_id = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO departments (name) VALUES (?)`,
            [answers.name], function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (err) {
        console.log(err.stack);
        throw new Error('Error adding depertment');
    }
};

module.exports = addDept;
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../db/connections.js');

const empMan = async () => {
    try {
        const manager = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM managers', function (err, results) {    
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
                name: 'manager',
                message: 'Which manager would you like to view?',
                choices: manager.map((man) => {
                    return {
                        name: man.first_name + ' ' + man.last_name,
                        value: man.id,
                    };
                }),
            }
        ]);
        const results = await new Promise((resolve, reject) => {
            db.query(`
            SELECT e.id, e.first_name, e.last_name 
            FROM all_employees AS e 
            JOIN managers AS m ON e.manager_id = m.id 
            WHERE m.id = ?`,
            [answers.manager], function (err, results) {
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
        throw new Error('Error retrieving/manager data');
    }
};
module.exports = empMan; 
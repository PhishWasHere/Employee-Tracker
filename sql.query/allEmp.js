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

module.exports = allEmp; 

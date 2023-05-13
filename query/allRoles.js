const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../db/connections.js');

const roles = async () => {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`
            SELECT r.title, r.salary
            FROM roles AS r`,
            function (err, results) {
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
        throw new Error('Error retrieving roles');
    }
};

module.exports = roles; 

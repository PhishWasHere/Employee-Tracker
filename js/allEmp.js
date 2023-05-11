const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
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

const allEmp = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employees', function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


const empDept = () => {
    return new Promise((resolve, reject) => {
        inquirer 
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department would you like to view?',
                choices: [
                    'accounting',
                    'legal',
                    'logistics',
                    'IT',
                    'sales',
                ]
            },
        ])
        .then((answers) => {
            db.query('SELECT * FROM employees WHERE departments = ?', [answers.department], function (err, results) {
                if (err) {
                  reject(err);
                }
                console.log(results);
                resolve();
            });
        });
    });
};

module.exports = {empDept, allEmp};

const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../db/connections.js');


    
const deleteEmp = async (empID) => {
    try {
        const deleteEmp = await new Promise((resolve, reject) => {
            db.query(`DELETE FROM all_employees WHERE id = ?`, empID, function (err, results) {
                if (err) {
                    reject(err.stack);
                    console.log('err removig employee');
                } else {
                    resolve(results);
                    console.log('Employee removed');
                }
            });
        }
        );
        
    } catch (err) {
        console.log(err.stack);
        throw new Error('Error retrieving/manager data');
    }
};

const delEmp = async () => {
    try {
        const employee = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM all_employees`, function (err, results) {
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
                name: 'employee',
                message: 'Which employee would you like to remove?',
                choices: ['cancel', ...employee.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })]
            }
        ]);
        if (answers.employee === 'cancel') {
            return;
        }else {   
            const empID = answers.employee;
            deleteEmp(empID);
        }
        
    } catch (err) {
        console.log(err.stack);
        throw new Error('Error retrieving/manager data');
    }
};

module.exports = delEmp; 

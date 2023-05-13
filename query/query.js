
//all required SQL queries, 
    //i have learnt that i hate sql query's with a passion. thanks for coming to my TedTalk

const allEmp = require('./allEmp.js');
const empDept = require('./empDept.js');
const empMan = require('./empMan.js');
const allRoles = require('./allRoles.js');
const allDept = require('./allDept.js');
const addEmp = require('./addEmp.js');
const delEmp = require('./delEmp.js');
const addDept = require('./addDept.js');
const addRole = require('./addRole.js');

const query = {
    allEmp,
    empDept,
    empMan,
    allRoles,
    allDept,
    addEmp,
    delEmp,
    addDept,
    addRole,
};

module.exports = query;
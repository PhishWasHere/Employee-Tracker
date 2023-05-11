const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'employees'
});

db.connect(function(err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to the database.');
});


module.exports = db;
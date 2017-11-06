const mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ananda',
    database : 'bookmyseat'
});

exports.connection = connection;

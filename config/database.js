const express = require("express");
const mysql = require("mysql");

//Create connection

const conn = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dcommunity',  //for localhost
  // multipleStatements: true
});
//   host: "us-cdbr-iron-east-04.cleardb.net",
//   user: "b7b19a957b6ee6",
//   password: "01b131ac",
//   database: "heroku_a3fb11a2c8de5a4",
//   multipleStatements: true
// });




// var conn = mysql.createPool({
//   connectionLimit : 100,
//   host            : 'us-cdbr-iron-east-04.cleardb.net',
//   user            : 'b7b19a957b6ee6',
//   password        : '01b131ac',
//   database        : 'heroku_a3fb11a2c8de5a4',
//   // multipleStatements: true
// });



module.exports = conn;

 

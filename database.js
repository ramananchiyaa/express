var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sriramanan"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("create table FORMS(fName varchar(50),lName varchar(50),age int,gender varchar(10),dateOfBirth varchar(50),pNumber varchar(50),email varchar(50))", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
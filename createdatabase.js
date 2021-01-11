const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "tester",
  
    // Your password
    password: "tester"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE employee_tracker_db", function (err, result) {
    if (err) throw err;
    console.log(`"employee_tracker_db" database created.`);
  });
});

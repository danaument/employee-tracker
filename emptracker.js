const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const queries = require("./lib/queries");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "tester",

  // Your password
  password: "tester",
  database: "employee_tracker_db",
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt([{
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Employees", "Exit"],
    }])
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      switch (answer.menu) {
        case "View Employees":
          console.log("running view employees query")
          queries.viewEmployees(connection, "employee");
          start();
          break;

        default:
          console.log("Goodbye!");
          break;
      }
    });
    
}

// connect to the mysql server and sql database
connection.connect(async (err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  await start();
//   connection.end()
});

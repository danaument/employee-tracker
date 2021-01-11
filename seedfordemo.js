var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "tester",
  
    // Your password
    password: "tester",
    database: "employee_tracker_db"
});
  


// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "seed",
        type: "list",
        message: "This program will delete your employee_tracker_DB database and recreate it with seed values for testing purposes. Would you like to continue?",
        choices: ["Run Program", "Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.seed === "Run Program") {
          plantSeed();
        }
        else {
          connection.end();
        }
    });
}

function plantSeed() {
    connection.query(`DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(45),
salary DECIMAL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department (id),
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NOT NULL,
FOREIGN KEY (role_id) REFERENCES role (id),
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES 
("Management"),
("Accounting"),
("Warehouse"),
("Product"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
("Supreme Overlord", 180000, 1),
("Associate Supreme Overlord", 25000, 1),
("A/P Administrator", 10000, 2),
("Inventory Distribution Coordinator", 12000, 3),
("Production Technician", 30000, 3),
("Customer Relations Associate", 45000, 5),
("Employee Relations Associate", 35000, 4), 
("Foreign Sales Lead", 30000, 5),
("Sales Associate", 20000, 5),
("Disassembly Generalist", 20000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Leslie", "Aument", 1, NULL),
("Daniel", "Aument", 2, 1),
("Jules", "O'Hara", 3, 2),
("Ajax", "Balthazar", 5, 2),
("Lucy", "Aument", 6, 1),
("Mabel", "Aument", 7, 1),
("Henry", "Aument", 4, 1),
("Temperance", "Brennan", 8, NULL),
("Samantha", "Parkington", 9, 5),
("Bruce", "Banner", 10, 7);`, function(error, results, fields){
    if (error) throw error;
    console.log("Employee_tracker_db has been recreated with seed values for demo.");
}
    )
}



// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});
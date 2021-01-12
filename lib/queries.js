// const cTable = require('console.table');
const util = require('util');
const mysql = require("mysql");

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

connection.connect();
connection.query = util.promisify(connection.query);

async function viewEmployees(table) {
    const SQL_STATEMENT = `SELECT id, first_name, last_name FROM ${table}`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

async function viewRoles() {
    const SQL_STATEMENT = `SELECT role.id, title, salary, department.name FROM role
                            INNER JOIN department on department_id = department.id
                            ORDER BY role.id`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

async function addEmployee(firstName, lastName, roleId, managerId) {
    const SQL_STATEMENT = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

async function viewDepartments() {
    const SQL_STATEMENT = `SELECT id, name FROM department;`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

async function addRole(title, salary, department) {
    const SQL_STATEMENT = `INSERT INTO role (title, salary, department_id)
    VALUES ("${title}", "${salary}", ${department})`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

async function addDept(name) {
    const SQL_STATEMENT = `INSERT INTO department (name)
    VALUES ("${name}")`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

async function updateRole(employeeId, newRoleId) {
    const SQL_STATEMENT = `UPDATE employee
    SET role_id = ${newRoleId}
    WHERE id = ${employeeId}`;
    try {
        return connection.query(SQL_STATEMENT);
    } catch (error) {
        console.log(error);
    };
} 

module.exports = {
    viewEmployees, viewRoles, addEmployee, viewDepartments, addRole, addDept, updateRole
};
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const queries = require("./lib/queries");
const [
    VIEW_ALL_EMPLOYEES,
    VIEW_ALL_DEPARTMENTS,
    VIEW_ALL_ROLES,
    ADD_EMPLOYEE,
    ADD_DEPARTMENT,
    ADD_ROLE,
    EMPLOYEE_LAST,
    EMPLOYEE_FIRST,
    EMPLOYEE_ROLE,
    EMPLOYEE_MANAGER,
    DEPARTMENT_NAME,
    ROLE_TITLE,
    ROLE_SALARY,
    ROLE_DEPARTMENT
] = require("./lib/const");
const { add } = require("lodash");

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
  let results;
  inquirer
    .prompt([{
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: [VIEW_ALL_EMPLOYEES, VIEW_ALL_DEPARTMENTS, VIEW_ALL_ROLES, ADD_EMPLOYEE, "Exit"],
    }])
    .then(async function (answer) {
      // based on their answer, either call the bid or the post functions
      switch (answer.menu) {
        case VIEW_ALL_EMPLOYEES:
          console.log("running view employees query")
          results = await queries.viewEmployees("employee");
          console.table(results);
          start();
          break;
        case ADD_EMPLOYEE:
          addNewEmployee();
          break;
        case VIEW_ALL_DEPARTMENTS:
          results = await queries.viewDepartments();
          console.table(results);
          start();
          break;
        case VIEW_ALL_ROLES:
          results = await queries.viewRoles();
          console.table(results);
          start();
          break;
        case ADD_ROLE:
          addNewRole();
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

async function addNewEmployee() {
    let idNameArray = await queries.viewEmployees("employee");
    let employeeList = [];
    idNameArray.forEach(element => employeeList.push(`${element.first_name} ${element.last_name}`));
    // console.log(employeeList);
    let idRoleArray = await queries.viewRoles();
    let roleList = [];
    // console.log(idRoleArray);
    idRoleArray.forEach(element => roleList.push(element.title));
    // console.log(roleList);
    inquirer
        .prompt([{
            name: "lastName",
            type: "input",
            message: EMPLOYEE_LAST,
            filter: function (name) {
                return name.trim();
            },
            validate: function (name) {
                if (name === "") {
                    return "The name cannot be blank.";
                } else return true;
            },
        }, {
            name: "firstName",
            type: "input",
            message: EMPLOYEE_FIRST,
            filter: function (name) {
                return name.trim();
            },
            validate: function (name) {
                if (name === "") {
                    return "The name cannot be blank.";
                } else return true;
            }
        }, {
            name: "manager_id",
            type: "list",
            message: EMPLOYEE_MANAGER,
            choices: employeeList,
            filter: function (val) {
                // console.log(val);
                console.log(employeeList.indexOf("Daniel Aument"));
                // console.log(idNameArray.indexOf(val));
                return (1 + employeeList.indexOf(val));
            }
        }, {
            name: "role_id",
            type: "list",
            message: EMPLOYEE_ROLE,
            choices: roleList,
            filter: function (val) {
                return (1 + roleList.indexOf(val));
            }
        }])
        .then(async function (answer) {
        // based on their answer, either call the bid or the post functions
            console.log(`Adding employee: ${answer.firstName}, ${answer.lastName}, ${answer.role_id}, ${answer.manager_id}`)
            let results = await queries.addEmployee(answer.firstName, answer.lastName, answer.role_id, answer.manager_id);
            start();
        })
}

async function addNewRole() {
    let idDeptArray = await queries.viewDepartments();
    let deptList = [];
    idDeptArray.forEach(element => deptList.push(element.title));
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: ROLE_TITLE,
            filter: function (name) {
                return name.trim();
            },
            validate: function (name) {
                if (name === "") {
                    return "The title cannot be blank.";
                } else return true;
            },
        }, {
            name: "salary",
            type: "input",
            message: ROLE_TITLE,
            filter: function (num) {
                return parseInt(num.trim());
            },
            validate: function (num) {
                if (!Number.isInteger(num)) {
                    return "The salary must be a number.";
                } else if (num === 0) {
                    return "The salary must be greater than 0, you tightwad!"
                } else return true;
            },
        }, {
            name: "dept_id",
            type: "list",
            message: ROLE_DEPARTMENT,
            choices: deptList,
            filter: function (val) {
                return (1 + deptList.indexOf(val));
            }
        }])
        .then(async function (answer) {
        // based on their answer, either call the bid or the post functions
            console.log(`Adding role: ${answer.title}, ${answer.salary}, ${answer.dept_id}`)
            let results = await queries.addRole(answer.title, answer.salary, answer.dept_id);
            start();
        })
}

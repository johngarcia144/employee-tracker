var mysql = require("mysql");
var inquirer = require("inquirer");
const util = require("util");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Pyrocity11!",
  database: "trackerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
//   connection.end();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "View all employees by manager",
                "Add employee",
                "Add department",
                "Add role",
                "Update employee role",
            ]})
      .then(function({action}) {
        // based on their answer, either call the bid or the post functions
        switch (action) {
          case "View all employees":
        readEmployees();
            break;
            case "View all roles":
        readRole();
            break;
            case "View all departments":
        readDepartment();
            break;
            case "View all employees by manager":
        byManager();
            break;
            case "Add employee":
        addEmployee();
            break;
            case "Add department":
        addDepartment();
            break;
            case "Add role":
        addRole();
            break;
          default:
            console.log("Command not found.")
        }
      });
  }

  function readEmployees() {
    var query = connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      runSearch();
    });
  }

  function readRole() {
    var query = connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;

      console.table(res);
      runSearch();
    });
  }
  
  function readDepartment() {
    var query = connection.query("Select * FROM department", function (error, res) {
            if (error) throw error
            console.table(res)
            runSearch();
        })
};

function byManager() {
    var results = connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
        function (error, manager) {
            if (error) throw error
            console.table(results)
            runSearch();
        })
};

function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "eeFirstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "eeLastName"
        },
        {
          type: "number",
          message: "What is the employee's role id number?",
          name: "roleID"
        },
        {
          type: "number",
          message: "What is the manager id number?",
          name: "managerID"
        }
      ])
      .then(function(answer) {
         var query = connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(query);
          console.log("You have successfully added a new employee")
          runSearch();
        });
      });
  }

  runSearch();
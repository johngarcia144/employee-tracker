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
                "Add employee",
                "Add department",
                "Add role",
                "Update employee role",
                "View employees by manager"
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
            case "Add employee":
        addEmployee();
            break;
            case "Add department":
        addDepartment();
            break;
            case "Add role":
        addRole();
            break;
            case "Update employee role":
        updateRole();
            break;
            case "View employees by manager":
        byManager();
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
    var query = connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id;",
        function (error, res) {
            if (error) throw error
            console.table(res)
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
          console.log("You have successfully added", answer.eeFirstName + " " + answer.eeLastName,"as anew employee")
          runSearch();
        });
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the title of the new role?",
          name: "newRole"
        },
        {
          type: "number",
          message: "What's the salary of the new role?",
          name: "newSalary"
        },
        {
          type: "number",
          message: "What is the department ID of the new role?",
          name: "deptID"
        }
      ])
      .then(function(answer) {
         var query = connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRole, answer.newSalary, answer.deptID], function(err, res) {
          if (err) throw err;
          console.log("You have successfully added", answer.newRole,"as a new role")
          runSearch();
        });
      });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the new department?",
          name: "newDept"
        }
      ])
      .then(function(answer) {
         var query = connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDept], function(err, res) {
          if (err) throw err;
          console.log("You have successfully added", answer.newDept,"as a new department")
          runSearch();
        });
      });
  }

//   function employeeList() {
//     var query = "SELECT id FROM employee";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id);
//       }
//       runSearch();
//     });
//   }

//   function updateRole() {
//     inquirer
//         .prompt({
//             name: "update",
//             type: "list",
//             message: "Choose an employee to update",
//             choices: [
//                 "View all employees",
//                 "View all roles",
//                 "View all departments",
//                 "Add employee",
//                 "Add department",
//                 "Add role",
//                 "Update employee role",
//             ]})
      


  runSearch();
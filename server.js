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
  connection.end();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
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
          case "View all employees by department":
          byDepartment();
            break;
            case "View all employees by department":
          byDepartment();
            break;
            case "View all employees by manager":
          byDepartment();
            break;
            case "Add employee":
          byDepartment();
            break;
            case "Add department":
          byDepartment();
            break;
            case "Add role":
          byDepartment();
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
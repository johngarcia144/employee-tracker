var mysql = require("mysql");
var inquirer = require("inquirer");

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
                "Add Department",
                "Add Role",
                "Remove employee",
                "Update employee role",
                "Update employee manager"
            ]})
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.start === "View all employees") {
          readEmployees();
        }
        else if(answer.start === "View all employees by department") {
          byDepartment();
        } 
        else if(answer.start === "View all employees by manager") {
            byDepartment();
          } 
          else if(answer.start === "Add employee") {
            byDepartment();
          } 
          else if(answer.start === "Add Department") {
            byDepartment();
          } 
          else if(answer.start === "Add role") {
            byDepartment();
          } 
          else if(answer.start === "Remove Employee") {
            byDepartment();
          } 
          else if(answer.start === "Update employee role") {
            byDepartment();
          } 
          else if(answer.start === "Update employee manager") {
            byDepartment();
          } 
        else{
          connection.end();
        }
      });
  }

  function readEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  }
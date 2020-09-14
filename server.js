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
    var query = connection.query("SELECT first_name, last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.department_id", function(err, res) {
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

  function updateRole() {
      
    connection.query('SELECT first_name, last_name, id from employee', function(err, res) {
      // console.table(res);
      if (err) throw err;
      const employee = res
      const employeeArr = []
      for (var i = 0; i < employee.length; i++) {
      //this loop variable will store both the name and the id, the id is how we will capture and delete the row while the name will be used in the inquirer prompt
      const loop = {
          name:(res[i].first_name + ' ' + res[i].last_name),
          value: res[i].id
          }
      employeeArr.push(loop);
      }
      connection.query('SELECT title, department_id from role', function(err, res) {
          // console.table(res);
          if (err) throw err;
          const role = res
          const roleArr = []
          for (var i = 0; i < role.length; i++) {
          //this loop variable will store both the name and the id, the id is how we will capture and delete the row while the name will be used in the inquirer prompt
          const loop2 = {
              name: res[i].title,
              value: res[i].department_id
              }
          roleArr.push(loop2);
          }
          connection.query('SELECT id, name from department', function(err, res) {
              // console.table(res);
              if (err) throw err;
              const department = res
              const departmentArr = []
              for (var i = 0; i < department.length; i++) {
              //this loop variable will store both the department and the id, the value is what we will replace the row with while the name will be used in the inquirer prompt
              const loop3 = {
                  name: res[i].name,
                  value: res[i].id
                  }
              departmentArr.push(loop3);
              }
      inquirer.prompt([
          {
              type: "list",
              message: "Please choose an employee to update.",
              choices: employeeArr,
              name: "update"
          },
          {
              type: "list",
              message: "Please choose a role to assign.",
              choices: roleArr,
              name: "role"
          },
          {
              type: "list",
              message: "What department is that role in?",
              choices: departmentArr,
              name: "department"
          }
      ]).then(choice => {
          // console.log(choice.role, choice.department, choice.update)
              connection.query('UPDATE employee SET role_id = ' + choice.role + ' WHERE id = ' + choice.update, function(err, res) {
              if (err) throw err;
              else console.log("Employee Successfully Updated!");
              runSearch();
          })
      })
      })
  })
  })
}
      


  runSearch();

  
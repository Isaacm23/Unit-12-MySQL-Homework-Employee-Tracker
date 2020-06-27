const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { isMainThread } = require("worker_threads");


var connection = mysql.createConnection({
    host: "localhost",
    port: 2323,
    user: "root",
    password: "Chicken23!",
    database: "employee_tracker"
});
connection.connect(err => {if (err) throw err;  start();
});
function start() {
    inquirer
      .prompt({
        name: "name",
        type: "list",
        message: "Select a menu",
        choices: ["Departments", "Roles", "Employees"]
      })
      
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 2323,
    user: "root",
    password: "Chicken23!",
    database: "employee_tracker"
});
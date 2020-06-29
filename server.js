const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chicken23!",
    database: "employee_tracker"
});

connection.connect(err => {if (err) throw (err);  start();
});
function start() {
    const viewOptions = [
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee",
        "exit"
    ];
    
    const employeeOptions = [
        "John Doe",
        "Joe John",
        "John Joe",
        "Tim Jimmy",
        "Jim Timmy",
        "Jimbo Smith",
        "Keith Johnson",
        "exit"
    ];
    
    const updateOptions = [
        "First Name",
        "Last Name",
        "Role",
        "exit"
    ];
    
   
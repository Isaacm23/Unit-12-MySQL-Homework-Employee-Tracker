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
        "Add Role",
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
    
    start();
    
    function start() {
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: viewOptions
            })
            .then(function (answer) {
                switch (answer.action) {
                    case viewOptions[0]:
                        departmentView();
                        break;
    
                    case viewOptions[1]:
                        roleView();
                        break;
    
                    case viewOptions[2]:
                        employeeView();
                        break;
    
                    case viewOptions[3]:
                        updateEmployee();
                   
                    case viewOptions[4]:
                        addRole();
    
                    case updateOptions[4]:
                        connection.end();
                        break
                }
            })
    }
    
    
    
    function departmentView() {
        var sqlStr = "SELECT * FROM department";
        connection.query(sqlStr, function (err, result) {
            if (err) throw err;
    
            console.table(result)
        start();
        })
    }
    
    function employeeView() {
        var sqlStr = "SELECT first_name, last_name, title, salary FROM employee ";
        sqlStr += "LEFT JOIN role ";
        sqlStr += "ON employee.role_id = role.id"
        connection.query(sqlStr, function (err, result) {
            if (err) throw err;
    
            console.table(result)
            start();
        })
    }
    
    function roleView() {
        var sqlStr = "SELECT * FROM role";
        connection.query(sqlStr, function (err, result) {
            if (err) throw err;
    
            console.table(result)
            start();
        })
    }
    

 
        function addRole() {
            let departments= []; 
          connection.query("SELECT * FROM departments",
          function(err,res){
            if(err) throw err;
            for (let i=0; i <res.length; i++){
              res[i].first_name + " " + res[i].last_name
              departments.push({name: res[i].name, value: res[i].id});
            }
          inquirer
          .prompt([
            {
              type: "input", 
              name: "title",
              message: "What role would you like to add?"
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for the role?"
            },
            {
              type: "list",
              name: "department",
              message: "what department?",
              choices: departments
            }
          ])
          .then (function(res){
            console.log(res); 
            const query = connection.query(
              "INSERT INTO roles SET ?",
              {
                title: res.title,
                salary: res.salary,
                department_id: res.department
              }, 
              function (err, res){
                if (err) throw err;
                //const id = res.insertId;
                start(); 
              }
            )
          })
          })
          }
}

  

   
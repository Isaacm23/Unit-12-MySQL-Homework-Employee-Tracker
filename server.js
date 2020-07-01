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
        "Add",
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
                    
                        case viewOptions[4]:
                        add();
                   
                    case viewOptions[5]:
                        
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
    function add() {
        inquirer
            .prompt(
                {
                    name: "db",
                    message: 'Which would you like to add?',
                    type: 'list',
                    choices: ['department', 'role', 'employee'],
                }
            ).then(function ({ db }) {
                switch (db) {
                    case "department":
                        addDepartment()
                        break;
                    case "role":
                        addRole()
                        break;
                    case 'employee':
                        addEmployee();
                        break;
                }
            })
    
    }
    function addDepartment() {
        inquirer
            .prompt(
                {
                    name: 'name',
                    message: "What is the department's name?",
                    type: 'input'
                }
            ).then(function ({ name }) {
                connection.query(`INSERT INTO department (name) VALUES ('${name}')`, function (err, data) {
                    if (err) throw err;
                    console.log(`Added`)
                    start();
                })
            })
    }
};
function addRole() {
    let departments = []

    connection.query(`SELECT * FROM department`, function (err, data) {
        if (err) throw err;

        for (let i = 0; i < data.length; i++) { // Loops through and finds the name of all the departments
            departments.push(data[i].name)

        }


        inquirer
            .prompt([
                {
                    name: 'title',
                    message: "What is the role?",
                    type: 'input'
                },
                {
                    name: 'salary',
                    message: 'How much do they make?',
                    type: 'input'
                },
                {
                    name: 'department_id',
                    message: 'What department does it belong to?',
                    type: 'list',
                    choices: departments
                }
            ]).then(function ({ title, salary, department_id }) {
                let index = departments.indexOf(department_id)

                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', ${index})`, function (err, data) {
                    if (err) throw err;
                    console.log(`Added`)
                    start();
                })
            })
    })
}

function addEmployee() {
    let employees = [];
    let roles = [];

    connection.query(`SELECT * FROM role`, function (err, data) {
        if (err) throw err;


        for (let i = 0; i < data.length; i++) {
            roles.push(data[i].title);
        }

        connection.query(`SELECT * FROM employee`, function (err, data) {
            if (err) throw err;

            for (let i = 0; i < data.length; i++) {
                employees.push(data[i].first_name);
            }

            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        message: "what's the employees First Name",
                        type: 'input'
                    },
                    {
                        name: 'last_name',
                        message: 'What is their last name?',
                        type: 'input',
                    },
                    {
                        name: 'role_id',
                        message: 'What is their role?',
                        type: 'list',
                        choices: roles,
                    },
                    {
                        name: 'manager_id',
                        message: "Who is their manager?",
                        type: 'list',
                        choices: ['none'].concat(employees)
                    }
                ]).then(function ({ first_name, last_name, role_id, manager_id }) {
                    let queryText = `INSERT INTO employee (first_name, last_name, role_id`;
                    if (manager_id != 'none') {
                        queryText += `, manager_id) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(role_id)}, ${employees.indexOf(manager_id) + 1})`
                    } else {
                        queryText += `) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(role_id) + 1})`
                    }
                    console.log(queryText)

                    connection.query(queryText, function (err, data) {
                        if (err) throw err;

                        start();
                    })
                })

        })
    })
};

    
 
        


  

   
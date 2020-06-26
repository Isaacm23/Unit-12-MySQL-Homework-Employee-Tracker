DROP DATABASE IF EXISTS employee_tracker; 
    
    CREATE DATABASE employee_tracker;
    
    USE employee_tracker;
    
    CREATE TABLE departments
    (
    id int AUTO_INCREMENT,
    PRIMARY KEY (id),
    name VARCHAR (30)
    );
    CREATE TABLE roles
    (
        id INT
        AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR
        (30),
        salary DECIMAL
        (8,2),
        department_id INT,
        FOREIGN KEY
        (department_id) REFERENCES departments
        (id)
); 

        CREATE TABLE employees
        (
            id INT
            AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR
            (30) NOT NULL,
        last_name VARCHAR
            (30) NOT NULL,
        role_id INT,
        manager_id INT,FOREIGN KEY
            (role_id) REFERENCES roles
            (id),
        FOREIGN KEY
            (manager_id) REFERENCES employees
            (id)
);
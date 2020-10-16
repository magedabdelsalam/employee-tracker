// Connect Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Connect Database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});

// Start CLI App
connection.connect(function (err) {
    if (err) throw err;
    start();
});

// Start Application
start = () => {
    inquirer
    .prompt({
        name: "start",
        type: "list",
        message: "Employee Dashboard",
        choices: [
            "Add employee, role, or department",
            "View employees, roles, or departments",
            "Update employee role",
            "Exit"
        ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "Add employee, role, or department":
            addItem();
            break;

        case "View employees, roles, or departments":
            viewItem();
            break;

        case "Update employee role":
            updateRole();
            break;

        case "Exit":
            connection.end();
            break;
      }
    });
};

// Add employee, role, or department
addItem = () => {
    inquirer
    .prompt({
        name: "add",
        type: "list",
        message: "Add",
        choices: [
            "Employee",
            "Role", 
            "Department"
        ],
    })
    .then(function (response) {
        console.log(response);
        switch (response.add) {
            case "Employee":
                addEmployee();
                break;

            case "Role":
                addRole();
                break;

            case "Department":
                addDepartment();
                break;

            case "Return":
                start();
                break;
        }
    });
};

// View  employee, role, or department
viewItem = () => {
    inquirer
    .prompt({
        name: "view",
        type: "list",
        message: "View",
        choices: [
            "Employee",
            "Role", 
            "Department"
        ],
    })
    .then((answer) =>  {
        switch (answer.view) {
            case "Employee":
                connection.query(
                    "SELECT employee.id,employee.first_name,employee.last_name,role.title,department.name FROM employee LEFT JOIN role  ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id",
                    function (err, data) {
                        if (err) {
                            throw err;
                        }
                        console.table(data);
                        start();
                    }
                );
                break;

            case "Role":
                connection.query(
                    "SELECT role.title, department.name, role.salary FROM department INNER JOIN role ON department.id=role.department_id",
                    function (err, data) {
                        if (err) {
                            throw err;
                        }
                        console.table(data);
                        start();
                    }
                );
                break;

            case "Department":
                connection.query(
                    "SELECT name FROM department", 
                    function (err,data) {
                        if (err) {
                            throw err;
                        }
                        console.table(data);
                        start();
                    }
                );
                break;
            
            case "Return":
                start();
                break;
        }
    });
};

// Add Department
addDepartment = () => {
    inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "Department Name:",
    })
    .then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            { 
                name: answer.department 
            },
            function (err) {
                if (err) throw err;
                start();
            }
        );
    });
};

// Add Role
addRole = () => {
    inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Role:"
      },
      {
        name: "salary",
        type: "input",
        message: "Salary:"
      },
      {
        name: "departmentID",
        type: "input",
        message: "Department ID:"
      },
    ])
    .then((answer) =>  {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentID
            },
            function (err) {
                if (err) throw err;
                start();
            }
        );
    });
};

// Add Employee
addEmployee = () => {
    inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee First Name:"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee Last Name:"
      },
      {
        name: "roleID",
        type: "input",
        message: "Employee Role ID:"
      },
    ])
    .then((answer) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID
            },
            function (err) {
                if (err) throw err;
                start();
            }
        );
    });
};

// Update Role
updateRole = () => {
    inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "Employee First Name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Employee Last Name:"
        },
        {
            name: "roleTitle",
            type: "input",
            message: "New Employee Role ID:"
        }
    ]).then((answer) => {
        connection.query(
            "UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?",
            [answer.roleTitle,answer.firstName,answer.lastName],
            function (err) {
                if(err) throw err;
                start();
            }
        );
    });
};
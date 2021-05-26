const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "avalanche_db",
});
//make connection to database and call start function
connection.connect((err) => {
  if (err) throw err;
  start();
});

//store start function
const start = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "view departments",
          "view roles",
          "view employees",
          "add departments",
          "add roles",
          "add employees",
          "update employee roles",
          "exit",
        ],
      },
    ])
    .then((data) => {
      switch (data.choice) {
        case "view departments":
          viewDepartments();
          break;
        case "view roles":
          viewRoles();
          break;
        case "view employees":
          viewEmployees();
          break;
        case "add departments":
          addDepartments();
          break;
        case "add roles":
          addRoles();
          break;
        case "add employees":
          addEmployees();
          break;
        case "update employee roles":
          updateEmployeeRoles();
          break;
        case "exit":
          connection.end();
          break;
      }
    })
    .catch();
};

//view departments, employees, and roles
const viewDepartments = () => {
  console.log("\nDEPARTMENTS\n");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
const viewRoles = () => {
  console.log("\nROLES\n");
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
const viewEmployees = () => {
  console.log("\nEMPLOYEES\n");
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//add departments, employees, and roles
const addDepartments = () => {
  inquirer
    .prompt([
      {
        message: "What is the name of the new department?",
        name: "department",
      },
    ])
    .then((data) => {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: data.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${data.department} has been added to your list of departments!\n`
            //show table of all departments
          );
          console.table();
        }
      );
    });
};

const addRoles = () => {
  inquirer
    .prompt([
      {
        message: "What is the title of the new role?",
        name: "title",
      },
      {
        message: "What is the salary of the new role?",
        name: "salary",
      },
      {
        type: "list",
        input: "number",
        message: "What will be the department id for this new role?",
        name: "department",
      },
    ])
    .then((data) => {
      const query = connection.query(
        "INSERT INTO roles SET ?",
        {
          title: data.title,
          salary: data.salary,
          department_id: data.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${data.title} has been added to your list of roles!\n`);
          start();
        }
      );
    });
};
//add functionality to select from existing database when creating new employee

// const getDepartment = () => {
//   connection.query("SELECT department_name FROM department", (err, res) => {
//     if (err) throw err;

//     let departments = [];
//     //create an empty array var, loop thru array of objects, pull dpt name, push into empty array
//     res.forEach((deptObj) => {
//       let depName = deptObj.department_name;
//       departments.push(depName);
//     });
//     console.log(departments);
//     return departments;

//     //return final results array
//   });
// };

// getDepartment();

// const getRoles = () => {
//   connection.query("SELECT * FROM roles", (err, res) => {
//     let roles = res.map(({ id, title }) => ({
//       name: `${title}`,
//       value: id,
//     }));

//     return roles;
//   });
// };
// const roles = getRoles();

const addEmployees = () => {
  connection.query(
    "SELECT * FROM employees WHERE manager_id IS null",
    (err, res) => {
      const managers = res.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      managers.unshift({
        name: "None",
        value: null,
      });

  inquirer
    .prompt([
      {
        message: "What's the employee's first name?",
        name: "firstName",
      },
      {
        message: "What's the employee's last name?",
        name: "lastName",
      },
      {
        message: "What is the employee's manager's id?",
        name: "managerId",
      },
      {
        message: "What is the employee's role id?",
        name: "role",
      },
    ])
    .then((data) => {
      const query = connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          roles_id: data.role,
          manager_id: data.managerId,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${data.firstName} ${data.lastName} has been added to your list of employees!\n`
          );
          viewEmployees();
        }
      );
    });
};

const updateEmployeeRole = () => {
  //GET list of employees
  //SELECT which employee to update
  //UPDATE role
};


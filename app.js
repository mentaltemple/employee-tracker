const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "add employees",
          "add roles",
          "add departments",
          "view employees",
          "view roles",
          "view departments",
          "update employee roles",
        ],
      },
    ])
    .then((data) => {
      switch (data.choice) {
        case "add employees":
          addEmployees();
          break;
        case "add roles":
          addRoles();
          break;
        case "add departments":
          addDepartments();
          break;
        case "view employees":
          viewEmployees();
          break;
        case "view roles":
          viewRoles();
          break;
        case "view departments":
          viewDepartments();
          break;
        case "update employee roles":
          updateEmployeeRoles();
          break;
      }
    })
    .catch();
};

const addEmployees = () => {
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
        message: "What's the employee's role id?",
        name: "roleId",
      },
      {
        message: "What's the employee's manager's id?",
        name: "managerId",
      },
    ])
    .then((data) => {
      const query = connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.roleID,
          manager_id: data.managerId,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${data.firstName} ${data.lastName} has been added to your list of employees!\n`
          );
        }
      );
    });
};

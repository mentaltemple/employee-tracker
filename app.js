const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "avalanche_db",
});
//make connection to database and start app
connection.connect((err) => {
  if (err) throw err;
  start();
});
//store const to start the app
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

//view employees, roles and departments
const viewEmployees = () => {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
const viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//add employees, roles and departments
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
        message: "What's the employee's role?",
        //add function to get role
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
            //show table of all employees
          );
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

// const getDepartment = () => {
//     connection.query("SELECT * FROM department", (err, res) => {
//       if (err) throw err;
//       console.log(res);
//     });
//   },

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
        }
      );
    });
};

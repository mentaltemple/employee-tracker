DROP DATABASE IF EXISTS avalanche_db;
CREATE DATABASE avalanche_db;

USE avalanche_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_dept FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,   
    CONSTRAINT fk_roles FOREIGN KEY(roles_id)
    REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY(manager_id)
    REFERENCES employees(id) ON DELETE SET NULL
);

INSERT INTO department (department_name) VALUES ("Ownership"),("Executives"), ("Coaches"), ("Trainers"), ("Players")
INSERT INTO roles (title, salary, department_id) VALUES ("Owner", 100000000, 1), ("GM", 300000, 2), ("Head Coach", 1500000, 3)
INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("Stan", "Kroenke", 1, 1), ("Joe", "Sakic", 2, 1), ("Jared", "Bednar", 3)
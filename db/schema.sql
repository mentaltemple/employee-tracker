DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

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


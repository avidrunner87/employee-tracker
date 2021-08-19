DROP DATABASE IF EXISTS empTrackerBusiness_db;
CREATE DATABASE empTrackerBusiness_db;

USE empTrackerBusiness_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

SHOW TABLES;

SELECT "Departments" AS "Table";
DESCRIBE departments;

SELECT "Roles" AS "Table";
DESCRIBE roles;

SELECT "Employees" AS "Table";
DESCRIBE employees;
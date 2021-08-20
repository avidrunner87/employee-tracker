const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const Department = require('./department');
const Role = require('./role');
require("dotenv").config();

const db = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 1,
    }
)

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.id = null;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }


    async getEmployee(id) {
        try {
            const rows = await db.query('SELECT * FROM employees WHERE id = ?', id);
            return rows[0];
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async viewAll() {
        try {
            const rows = await db.query('SELECT d.id AS department_id, d.name AS department_name, e.id AS employee_id, e.last_name, e.first_name, r.title, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id LEFT JOIN employees m ON m.id = e.manager_id');
            if (rows[0].length !== 0) {
                console.log('***** Employees *****\n');
                console.table(rows[0]);
                return rows[0];
            } else {
                console.log('No employees defined\n');
                return 0
            }

        } catch (err) {
            console.log(err);
            return err;
        }

    };

    async byManager() {
        try {
            const rows = await db.query('SELECT g.manager_name, g.employee_name FROM (SELECT CONCAT(e.first_name, " ", e.last_name) AS employee_name, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employees e LEFT JOIN employees m ON m.id = e.manager_id) g GROUP BY g.manager_name, g.employee_name ORDER BY g.manager_name ASC');
            if (rows[0].length !== 0) {
                console.log('***** Employees by Manager *****\n');
                console.table(rows[0]);
                return;
            } else {
                console.log('No employees defined\n');
                return 0;
            }
        } catch (err) {
            console.log(err);
            return err;
        }

    };

    async byDepartment() {
        try {
            const rows = await db.query('SELECT g.department_name, g.employee_name FROM (SELECT CONCAT(e.first_name, " ", e.last_name) AS employee_name, d.name AS department_name FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id) g GROUP BY g.department_name, g.employee_name ORDER BY g.department_name ASC');
            if (rows[0].length !== 0) {
                console.log('***** Employees by Manager *****\n');
                console.table(rows[0]);
                return;
            } else {
                console.log('No employees defined\n');
                return 0;
            }
        } catch (err) {
            console.log(err);
            return err;
        }

    };

    insertNew() {
        return inquirer.prompt([
            {
                type: 'number',
                name: 'roleId',
                message: 'What is the ID of the role for the employee?'
            },
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'What is the last name of the employee?'
            }
        ])
        .then(async res1 => {

            const employee = new Employee();
            const viewEmployees = await employee.viewAll()

            return inquirer.prompt([
                {
                    type: 'number',
                    name: 'managerId',
                    message: 'What is the ID of the manager?'
                }
            ])
            .then(async res2 => {
                if(isNaN(res2.managerId)) {
                    res2.managerId = null;
                }
                const employee = new Employee(res1.employeeFirstName, res1.employeeLastName, res1.roleId, res2.managerId);
                
                try {
                    const newEmployee = await db.query('INSERT INTO employees SET ?', employee);
                    return employee;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            })
        })
    };

    updateExisting() {
        return inquirer.prompt([
            {
                type: 'number',
                name: 'employeeId',
                message: 'What is the ID of the employee you would like to edit?'
            },
            {
                type: 'list',
                name: 'employeeField',
                message: 'What field would you like to modify?',
                choices: ['first_name', 'last_name', 'role_id', 'manager_id']
            },
            {
                type: 'input',
                name: 'newValue',
                message: (res) => `What is the new value for ${res.employeeField}?`
            },
        ])
        .then(async res => {
            try {
                const updateEmployee = await db.query(`UPDATE employees SET ${res.employeeField} = ? WHERE id = ?`, [res.newValue, res.employeeId]);
                return res.employeeField;
            } catch (err) {
                console.log(err);
                return err;
            }
        })
    };

    deleteExisting() {
        return inquirer.prompt([
            {
                type: 'number',
                name: 'employeeId',
                message: 'What is the ID of the employee you would like to delete?'
            }
        ])
        .then(async res => {
            if (!isNaN(res.employeeId)) {
                try {
                    const employeeDeleted = this.getEmployee(res.employeeId);
                    const deleteEmployee = await db.query('DELETE FROM employees WHERE id = ?', res.employeeId);
                    console.log(`\nSuccessfully deleted the employee!\n`)
                    return;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            } else {
                console.log('\nCancelled\n');
            }
        })
    };
}

module.exports = Employee;
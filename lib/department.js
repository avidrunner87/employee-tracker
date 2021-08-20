const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
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

class Department {
    constructor(name) {
        this.id = null;
        this.name = name;
    }

    async getDepartment(id) {
        try {
            const rows = await db.query('SELECT * FROM departments WHERE id = ?', id);
            return rows[0];
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async viewAll() {
        try {
            const rows = await db.query('SELECT * FROM departments ORDER BY id ASC');
            if (rows[0].length !== 0) {
                console.log('***** Departments *****\n');
                console.table(rows[0]);
                return;
            } else {
                console.log('No departments defined\n');
                return 0;
            }
        } catch (err) {
            console.log(err);
            return err;
        }

    };

    async viewReadyToDelete() {
        try {
            const rows = await db.query('SELECT * FROM departments WHERE id NOT IN (SELECT department_id FROM roles) ORDER BY id ASC');
            if (rows[0].length !== 0) {
                console.log('***** Departments *****\n');
                console.table(rows[0]);
                console.log('\nPLEASE NOTE: If you don\'t see a department listed above, it is because\n there is a role associated to it. Please update the\n role before trying to delete the department\n')
                return;
            } else {
                console.log('No departments defined\n');
                return 0;
            }
        } catch (err) {
            console.log(err);
            return err;
        }

    };

    async budget() {
        try {
            const rows = await db.query('SELECT b.department_name, SUM(b.employee_salary) AS department_budget FROM(SELECT d.name AS department_name, r.salary AS employee_salary FROM employees e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id) b GROUP BY b.department_name ORDER BY b.department_name ASC');
            if (rows[0].length !== 0) {
                console.log('***** Department Budgets *****\n');
                console.table(rows[0]);
                return;
            } else {
                console.log('No departments defined\n');
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
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the new department?'
            }
        ])
        .then(async res => {
            const department = new Department(res.departmentName);
            
            try {
                const newDepartment = await db.query('INSERT INTO departments SET ?', department);
                return department;
            } catch (err) {
                console.log(err);
                return err;
            }
        })
    };

    updateExisting() {
        return inquirer.prompt([
            {
                type: 'number',
                name: 'departmentId',
                message: 'What is the ID of the department you would like to edit?'
            },
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the new name of the department?'
            }
        ])
        .then(async res => {
            try {
                const updateDepartment = await db.query('UPDATE departments SET name = ? WHERE id = ?', [res.departmentName, res.departmentId]);
                return res.departmentName;
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
                name: 'departmentId',
                message: 'What is the ID of the department you would like to delete?'
            }
        ])
        .then(async res => {
            if (!isNaN(res.departmentId)) {
                try {
                    const departmentDeleted = this.getDepartment(res.departmentId);
                    const deleteDepartment = await db.query('DELETE FROM departments WHERE id = ?', res.departmentId);
                    console.log(`\nSuccessfully deleted the department!\n`)
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

module.exports = Department;
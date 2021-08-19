const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const Department = require('./department');
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

class Role {
    constructor(title, salary, department_id) {
        this.id = null;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }


    async getRole(id) {
        try {
            const rows = await db.query('SELECT * FROM roles WHERE id = ?', id);
            return rows[0];
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async viewAll() {
        try {
            const rows = await db.query('SELECT r.department_id, d.name AS department_name, r.id AS role_id, r.title AS role_title, r.salary AS role_salary FROM roles r LEFT JOIN departments d ON r.department_id = d.id ORDER BY d.name, r.title ASC');
            if (rows[0].length !== 0) {
                console.log('***** Roles *****\n');
                console.table(rows[0]);
                return rows[0];
            } else {
                console.log('No roles defined\n');
                return 0
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
                name: 'departmentId',
                message: 'What is the ID of the department for this new role?'
            },
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the title of the new role?'
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'What is the annual salary of the new role (USD)?'
            },
        ])
        .then(res => {
            const role = new Role(res.roleTitle, res.roleSalary, res.departmentId);
            
            try {
                const newRole = db.query('INSERT INTO roles SET ?', role);
                return role;
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
                name: 'roleId',
                message: 'What is the ID of the role you would like to edit?'
            },
            {
                type: 'list',
                name: 'roleField',
                message: 'What field would you like to modify?',
                choices: ['title', 'salary', 'department_id']
            },
            {
                type: 'input',
                name: 'newValue',
                message: (res) => `What is the new value for ${res.roleField}?`
            },
        ])
        .then(res => {
            try {
                const updateRole = db.query(`UPDATE roles SET ${res.roleField} = ? WHERE id = ?`, [res.newValue, res.roleId]);
                return res.roleField;
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
                name: 'roleId',
                message: 'What is the ID of the role you would like to delete?'
            }
        ])
        .then(res => {
            if (!isNaN(res.roleId)) {
                try {
                    const roleDeleted = this.getRole(res.roleId);
                    const deleteRole = db.query('DELETE FROM roles WHERE id = ?', res.roleId);
                    console.log(`\nSuccessfully deleted the role!\n`)
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

module.exports = Role;
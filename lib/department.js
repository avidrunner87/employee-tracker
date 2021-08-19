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
            console.table(rows[0]);
            return;
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
        .then(res => {
            const department = new Department(res.departmentName);
            
            try {
                const newDepartment = db.query('INSERT INTO departments SET ?', department);
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
                type: 'input',
                name: 'departmentId',
                message: 'What is the ID of the department you would like to edit?'
            },
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the new name of the department?'
            }
        ])
        .then(res => {
            try {
                const updateDepartment = db.query('UPDATE departments SET name = ? WHERE id = ?', [res.departmentName, res.departmentId]);
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
                type: 'input',
                name: 'departmentId',
                message: 'What is the ID of the department you would like to delete?'
            }
        ])
        .then(res => {
            try {
                const departmentDeleted = this.getDepartment(res.departmentId);
                const updateDepartment = db.query('DELETE FROM departments WHERE id = ?', res.departmentId);
                return departmentDeleted;
            } catch (err) {
                console.log(err);
                return err;
            }
        })
    };
}

module.exports = Department;
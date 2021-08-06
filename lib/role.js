const mysql = require('mysql2');

class Role {
    constructor(title, salary, department_id) {
        this.id = null;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    insertNew() {
        return 
    }

}

module.exports = Role;
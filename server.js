const inquirer = require('inquirer');

const Department = require('./lib/department');
const Employee = require('./lib/employee');
const Role = require('./lib/role');

console.clear();

console.log("\n**************************************************\n\nWELCOME TO EMPLOYEE TRACKER\n\n**************************************************\n\n");

mainMenu();

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add/Update Employee', 'View All Roles', 'Add/Update Role', 'View All Departments', 'Add/Update Department', 'Additional Reports', 'Exit']
        }
    ])
    .then((res) => {
        switch (res.mainMenu) {
            case 'View All Employees':
                console.log('\n');
                viewEmployees();
                break;
            
            case 'Add/Update Employee':
                console.log('\n');
                modifyEmployees();
                break;
            
            case 'View All Roles':
                console.log('\n');
                viewRoles();
                break;

            case 'Add/Update Role':
                console.log('\n');
                modifyRoles();
                break;

            case 'View All Departments':
                console.log('\n');
                viewDepartments();
                break;

            case 'Add/Update Department':
                console.log('\n');
                modifyDepartments();
                break;

            case 'Additional Reports':
                console.log('\n');
                additionalReports();
                break;

            default:
                console.log('\nGoodbye!\n\n');
                process.exit();
                break;
        }
    })
}

function modifyDepartments() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'modifyDepartments',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Edit Department', 'Delete Department', 'Go Back']
        }
    ])
    .then((res) => {
        switch (res.modifyDepartments) {
            case 'Add Department':
                console.log('\n');
                addDepartment();
                break;
            
            case 'Edit Department':
                console.log('\n');
                editDepartment();
                break;
            
            case 'Delete Department':
                console.log('\n');
                deleteDepartment();
                break;

            default:
                console.log('\n');
                mainMenu();
        }
    })
}

async function viewDepartments() {
    const department = new Department();
    const viewDepartments = await department.viewAll();

    mainMenu();
}

async function addDepartment() {
    const department = new Department();
    const newDepartment = await department.insertNew();

    console.log(`\nSuccessfully added ${newDepartment.name} department!\n`);

    modifyDepartments();
}

async function editDepartment() {
    const department = new Department();
    
    const viewDepartments = await department.viewAll();

    if(viewDepartments !== 0) {
        const editDepartment = await department.updateExisting();

        console.log(`\nSuccessfully updated ${editDepartment.departmentName} department!\n`)
    } else {
        console.log('Please define at least one department\n')
    }

    modifyDepartments();
}

async function deleteDepartment() {
    const department = new Department();
    
    const viewDepartments = await department.viewReadyToDelete();
    
    if(viewDepartments !== 0) {
        const deleteDepartment = await department.deleteExisting();

    } else {
        console.log('Please define at least one department\n')
    }

    modifyDepartments();
}

function modifyRoles() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'modifyRoles',
            message: 'What would you like to do?',
            choices: ['Add Role', 'Edit Role', 'Delete Role', "Go Back"]
        }
    ])
    .then((res) => {
        switch (res.modifyRoles) {
            case 'Add Role':
                console.log('\n');
                addRole();
                break;
            
            case 'Edit Role':
                console.log('\n');
                editRole();
                break;
            
            case 'Delete Role':
                console.log('\n');
                deleteRole();
                break;

            default:
                console.log('\n');
                mainMenu();
        }
    })
}

async function viewRoles() {
    const role = new Role();
    const viewRoles = await role.viewAll();

    mainMenu();
}

async function addRole() {
    const role = new Role();
    const department = new Department();

    const viewDepartments = await department.viewAll();
    if(viewDepartments !== 0) {
        const newRole = await role.insertNew();

        console.log(`\nSuccessfully added ${newRole.name} role!\n`);
    } else {
        console.log('Please define at least one department before trying to create a new role\n')
    }

    modifyRoles();
}

async function editRole() {
    const role = new Role();

    const viewRoles = await role.viewAll();
    if(viewRoles !== 0) {
        const editRole = await role.updateExisting();

        console.log(`\nSuccessfully updated the ${editRole.roleField} field!\n`)
    } else {
        console.log('Please define at least one role.\n')
    }

    modifyRoles();
}

async function deleteRole() {
    const role = new Role();
    
    const viewRoles = await role.viewAll();
    if(viewRoles !== 0) {
        const deleteRole = await role.deleteExisting();

    } else {
        console.log('Please define at least one role.\n')
    }
    
    modifyRoles();
}

function modifyEmployees() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'modifyEmployees',
            message: 'What would you like to do?',
            choices: ['Add Employee', 'Edit Employee', 'Delete Employee', "Go Back"]
        }
    ])
    .then((res) => {
        switch (res.modifyEmployees) {
            case 'Add Employee':
                console.log('\n');
                addEmployee();
                break;
            
            case 'Edit Employee':
                console.log('\n');
                editEmployee();
                break;
            
            case 'Delete Employee':
                console.log('\n');
                deleteEmployee();
                break;

            default:
                console.log('\n');
                mainMenu();
        }
    })
}

async function viewEmployees() {
    const employee = new Employee();
    const viewEmployees = await employee.viewAll();

    mainMenu();
}

async function addEmployee() {
    const employee = new Employee();
    const role = new Role();

    const viewRoles = await role.viewAll();
    if(viewRoles !== 0) {
        const newEmployee = await employee.insertNew();

        console.log(`\nSuccessfully added ${newEmployee.first_name} ${newEmployee.last_name}!\n`);
    } else {
        console.log('Please define at least one role before trying to create a new employee\n')
    }

    modifyEmployees();
}

async function editEmployee() {
    const employee = new Employee();

    const viewEmployees = await employee.viewAll();
    if(viewEmployees !== 0) {
        const editEmployee = await employee.updateExisting();

        console.log(`\nSuccessfully updated the ${editEmployee.employeeField} field!\n`)
    } else {
        console.log('Please define at least one employee.\n')
    }

    modifyEmployees();
}

async function deleteEmployee() {
    const employee = new Employee();
    
    const viewEmployees = await employee.viewAll();
    if(viewEmployees !== 0) {
        const deleteEmployee = await employee.deleteExisting();

    } else {
        console.log('Please define at least one employee.\n')
    }
    
    modifyEmployees();
}

function additionalReports() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'report',
            message: 'What report would you like to see?',
            choices: ['Employees by Manager', 'Employees by Department', 'Budget by Department', "Go Back"]
        }
    ])
    .then(res => {
        switch (res.report) {
            case 'Employees by Manager':
                console.log('\n');
                viewEmployeeByMgr();
                break;
            
            case 'Employees by Department':
                console.log('\n');
                viewEmployeebyDept();
                break;
            
            case 'Budget by Department':
                console.log('\n');
                viewBudgetByDept();
                break;

            default:
                console.log('\n');
                mainMenu();
        }
    })
}

async function viewEmployeeByMgr() {
    const employee = new Employee();
    const viewEmployees = await employee.byManager();
    additionalReports();
}

async function viewEmployeebyDept() {
    const employee = new Employee();
    const viewEmployees = await employee.byDepartment();
    additionalReports();
}

async function viewBudgetByDept() {
    const department = new Department();
    const viewDepartments = await department.budget();
    additionalReports();
}
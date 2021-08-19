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
            choices: ['View All Employees', 'Add/Update Employee', 'View All Roles', 'Add/Update Role', 'View All Departments', 'Add/Update Department', 'Exit']
        }
    ])
    .then((res) => {
        switch (res.mainMenu) {
            case 'View All Employees':
                console.log("View Employees");
                mainMenu();
                break;
            
            case 'Add/Update Employee':
                console.log("Add/Update Employee");
                mainMenu();
                break;
            
            case 'View All Roles':
                console.log("View Roles");
                mainMenu();
                break;

            case 'Add/Update Role':
                console.log("Add/Update Role");
                mainMenu();
                break;

            case 'View All Departments':
                console.log('\n');
                viewDepartments();
                break;

            case 'Add/Update Department':
                console.log('\n');
                modifyDepartments();
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
            choices: ['Add Department', 'Edit Department', 'Delete Department', "Go Back"]
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
    const editDepartment = await department.updateExisting();

    console.log(`\nSuccessfully updated ${editDepartment.departmentName} department!\n`)

    modifyDepartments();
}

async function deleteDepartment() {
    const department = new Department();
    const viewDepartments = await department.viewAll();
    const deleteDepartment = await department.deleteExisting();
    console.log(`\nSuccessfully deleted the ${deleteDepartment[0].name} department!\n`)

    modifyDepartments();
}
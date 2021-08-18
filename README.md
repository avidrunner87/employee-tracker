# employee-tracker

## Table of Contents

1. [Description](#description)
1. [Usage](#usage)
1. [User Story](#user-story)
1. [Acceptance Criteria](#acceptance-criteria)
1. [Licenses](#licenses)
1. [Technology](#technology)
1. [Mock-up](#mock-up)
1. [Support](#support)
   - [Installation](#installation)
   - [Questions](#questions)
1. [References](#references)

## Description
A command-line application to manage a company's employee database.

## Usage
You can access the app here: [https://github.com/avidrunner87/employee-tracker](https://github.com/avidrunner87/employee-tracker).

## User Story
>**AS A(N)** business owner<br>
I **WANT** to be able to view and manage the departments, roles, and employees in my company<br>
**SO THAT** I can organize and plan my business


## Acceptance Criteria
**GIVEN** a command-line application that accepts user input

>**WHEN** I start the application<br>
**THEN** I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

>**WHEN** I choose to view all departments<br>
**THEN** I am presented with a formatted table showing department names and department ids

>**WHEN** I choose to view all roles<br>
**THEN** I am presented with the job title, role id, the department that role belongs to, and the salary for that role

>**WHEN** I choose to view all employees<br>
**THEN** I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

>**WHEN** I choose to add a department<br>
**THEN** I am prompted to enter the name of the department and that department is added to the database

>**WHEN** I choose to add a role<br>
**THEN** I am prompted to enter the name, salary, and department for the role and that role is added to the database

>**WHEN** I choose to add an employee<br>
**THEN** I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

>**WHEN** I choose to update an employee role<br>
**THEN** I am prompted to select an employee to update and their new role and this information is updated in the database 


## Licenses
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/avidrunner87/team-profile-generator/blob/main/LICENSE.md)

## Technology
![HTML](https://img.shields.io/static/v1?label=html&message=34.2%&color=red)
![CSS](https://img.shields.io/static/v1?label=css&message=3.1%&color=purple)
![JavaScript](https://img.shields.io/static/v1?label=javascript&message=62.7%&color=yellow)


## Mock-up
The following picture shows the website appearance and capabilities:

<img src="./assets/images/screenshots/mockup.gif" width="600"><br>
<img src="./assets/images/screenshots/screenshot01.png" width="300">
<img src="./assets/images/screenshots/screenshot02.png" width="300"><br>
<img src="./assets/images/screenshots/screenshot03.png" width="300">

## Support
### Installation
To fork this code to further improve the website, please follow these directions:

1. In Github fork the repository.
1. Clone the repository to your local computer.

_This assumes that you have setup your own SSH keys to connect with Github._

1. Before running the note-taker, please ensure all the necessary node modules are installed:

```
npm install
```

You can run the express server locally running the following command:
```
npm start
```

### Questions
If you have any questions please reach out to me via [Github](https://github.com/avidrunner87) or via [email](mailto:andrew.ronchetto@me.com).

## References
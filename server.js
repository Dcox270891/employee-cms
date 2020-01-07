const express = require("express");
const app = express();
const mysql = require(`mysql`);
const inquirer = require("inquirer");
const cTable = require('console.table');
const Employee = require(`./classes/emplyee.js`);
const Department = require(`./classes/department.js`);
const Role = require(`./classes/role.js`);
const mySQLcommands = require(`./mySQLcommands`);
const PORT = process.env.PORT || 4567;
const prompt = inquirer.createPromptModule();

let department_name;
let role_title;
let role_salary;
let role_department;

const connection = mysql.createConnection({
    host:`localhost`,
    user:`root`,
    password:`test`,
    database:`employee`,
});

connection.connect(function (err){
    if (err) throw err;
    inquirer
        .prompt([{
            type : `list`,
            message : `Please pick a option from the following`,
            name : `inital_request`,
            choices : [
                {
                    name : `Add a new department`
                },
                {
                    name : `Add a new role`
                },
                {
                    name : `Add a new employee`
                },
                {
                    name : `View current departments`
                },
                {
                    name : `View current roles`
                },
                {
                    name : `Veiw current emlpoyees`
                },
                {
                    name : `Update current emlpoyees`
                },
            ]
        },
        {
            type : `input`,
            message : `Please Type in the name of your new department`,
            name : `department_name`,
            when: function(answer) {
                return answer.inital_request === `Add a new department`;
            },
            validate: function(answer) {
                if (!answer) {
                    return `You need a name for the department to conintue`;
                }
                return true;
            }
        },
        {
            type : `input`,
            message : `Please Type in the name of your new role`,
            name : `role_title`,
            when: function(answer) {
                return answer.inital_request === `Add a new role`;
            },
            validate: function(answer) {
                if (!answer) {
                    return `You need a name for the role to conintue`;
                }
                return true;
            }
        },
        {
            type : `input`,
            message : `Please Type in the salary of your new role`,
            name : `role_salary`,
            when: function(answer) {
                return answer.role_title !== ``;
            },
            validate: function(answer) {
                if (!Number(answer)) {
                    return `You need a salary for the role to conintue (it must be a number)`;
                }
                return true;
            }
        },
        {
            type : `input`,
            message : `Please select a department id for your new role`,
            name : `role_department`,
            when: function(answer) {
                return answer.role_salary !== ``;
            },
            validate : function(answer) {
                if (!Number(answer)) {
                    return `You need a deparment id for the role to conintue (it must be a number)`;
                }
                return true;
            }
        },
    ])
        .then(answer =>{
            if(answer.inital_request === `Add a new department`){
                    const newDepartment = new Department(answer.department_name);
                    connection.query(`INSERT INTO department SET ?`, newDepartment, (err, res) =>{
                    if (err) throw err;
                    console.log(`${newDepartment.JSONstringify()} has been added as a new department`);
                }
            )} else if(answer.inital_request === `Add a new role`){
                const newRole = new Role(answer.role_title, answer.role_salary, answer.role_department);
                connection.query(`INSERT INTO role SET ?`, newRole, (err, res) =>{
                if (err) throw err;
                console.log(`${newRole.JSONstringify()} has been added as a new role`);
            }
            )} else if(answer.inital_request === `View current departments`){
                connection.query(`SELECT * FROM department`, (err, res)=>{
                    if (err) throw err;
                    console.table(res);
                }
            )} else if(answer.inital_request === `View current roles`){
                connection.query(`SELECT * FROM role`, (err, res)=>{
                    if (err) throw err;
                    console.table(res);
                }
            )} else if(answer.inital_request === `View current employees`){
                connection.query(`SELECT * FROM employee`, (err, res)=>{
                    if (err) throw err;
                    console.table(res);
                }
            )}
        })
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});

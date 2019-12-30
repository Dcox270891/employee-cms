const express = require("express");
const app = express();
const mysql = require(`mysql`);
const inquirer = require("inquirer");
const cTable = require('console.table');
const Employee = require(`./classes/emplyee.js`);
const Department = require(`./classes/department.js`);
const Role = require(`./classes/role.js`);
const PORT = process.env.PORT || 4567;
const prompt = inquirer.createPromptModule();

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
        }])
        .then(answer =>{
            if(answer.inital_request === `View current departments`){
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
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4567;
const mysql = require(`mysql`);
const Employee = require(`./classes/emplyee.js`);
const Department = require(`./classes/department.js`);
const Role = require(`./classes/role.js`);
const connection = mysql.createConnection({
    host:`localhost`,
    user:`root`,
    password:`test`,
    database:`employee`,
});

connection.connect(err => {
    console.log(err);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
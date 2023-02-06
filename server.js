const express = require("express");
const app = express();
const port = 3000;
const mysql = require('mysql');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

//Routes
const register = require('./routes/register');
app.use("/register", register);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

connect.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});
const express = require("express");

const sqlDbconnect = require("./dbconnect");

const Router = express.Router();

Router.get("/", (req, res) => {
    const userData = [{ name: "Johan pp", email: "abc@gmail.com", age: 34 },
                      { name: "Sohan tt", email: "xyz@gmail.com", age: 44 }
    ];
    res.send(userData);
});

Router.get("/api/user", (req, res) => {
    sqlDbconnect.query("select * from tbl_user", (err, rows) => {
        if (!err)
        {
            res.send(rows);
        } else {
            console.log(err);
            }
    });
});

Router.get("/api/country", (req, res) => {
    sqlDbconnect.query("select * from tbl_country", (err, rows) => {
        if (!err)
        {
            res.send(rows);
        } else {
            console.log(err);
            }
    });
});


Router.get("/api/state/:id", (req, res) => {
    sqlDbconnect.query("select * from tbl_state where countryid='"+req.params.id+"'", (err, rows) => {
        if (!err)
        {
            res.send(rows);
        } else {
            console.log(err);
            }
    });
});

Router.post("/api/adduser", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const status = req.body.status;

    var sql = `INSERT INTO tbl_user (username, email, phone, address, status) VALUES ("${username}","${email}","${phone}","${address}","${status}")`;

    sqlDbconnect.query(sql, (err, result) => {
        if (!err) {
            res.status(200).json("User added successfully.");
        } else {
            console.log(err);
        }
    });

});

module.exports = Router;
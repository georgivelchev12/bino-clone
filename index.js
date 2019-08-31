var express = require("express");
var app = express();
var port = process.env.PORT || 5500;

app.get("/", (req,res) => {
    res.send("Welcome to bino-clone app");
})

app.listen(port);
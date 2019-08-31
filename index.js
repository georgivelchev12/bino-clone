var express = require("express");
var app = express();
const path = require('path');
var port = process.env.PORT || 5500;
app.use(express.static(__dirname));
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(port);
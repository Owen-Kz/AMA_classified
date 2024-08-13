const express = require("express")
const db = require("./routes/db.config");
const dotenv = require("dotenv").config();
const app =  express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 31000;
const server = require("http").Server(app)
// const session = require("express-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(express.json());


app.set("view engine", "ejs");

app.set("views", ["views", "/views", "./views", "./views/admin"]);

app.use("/css", express.static(__dirname + "/public/css", { type: 'text/css' }))
app.use("/js", express.static(__dirname + "/public/js", { type: 'text/javascript' }))
app.use("/vendor", express.static(__dirname + "/public/vendor", {type: 'text/javacript'}))
app.use("/assets", express.static(__dirname + "/public/assets/", { type: 'text/folder' }))
app.use("/uploads", express.static(__dirname + "/public/uploads/", { type: 'text/folder' }))



app.use("/", require("./routes/pages"));

server.listen(PORT); 
console.log("Server is running on", PORT)
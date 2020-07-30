var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helpers = require("./helper/helper");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var DATABASEURL = process.env.DATABASEURL || "mongodb://localhost/todo_db";
mongoose.connect(DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected!");
}).catch(() => {
    console.log("DataBase not Connected!");
});

mongoose.set("debug", true);
mongoose.Promise = Promise;

var Todo = require("./models/todoSchema");

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.get("/api/todos", helpers.getTodos);
app.post("/api/todos", helpers.create);
app.get("/api/todos/:todo_id", helpers.find);
app.put("/api/todos/:todo_id", helpers.update);
app.delete("/api/todos/:todo_id", helpers.delete);



app.get("*", (req, res) => {
    res.json({
        message: "Wrong path",
    });
});


var PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, (req, res) => {
    console.log("Listening on PORT- " + PORT);
});
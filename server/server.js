const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/Todo");
const {user} = require("./models/User");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  })
  .catch((e) => {
    res.status(400).send(e);
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then((docs) => {
    res.send({
      docs,
      statusCode: 200
    });
  })
  .catch((err) => {
    res.send(err);
  });
});

app.get("/todos/:id", (req, res) => {
  var todoID = req.params.id;

  Todo.find({_id: todoID}).then((doc) => {
    res.send(doc);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

app.listen("3000", () => {
  console.log("Started On Port 3000");
});

module.exports = {app};

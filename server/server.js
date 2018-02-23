const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

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

  if(ObjectID.isValid(todoID)){
    return Todo.findById(todoID).then((doc) => {
      if(doc){
        return res.send({
          doc,
          statusCode: 200
        });
      }
      res.status(404).send({
        message: "No Todo's ID Matches The Provided ID.",
        statusCode: 404
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
  res.status(400).send({
    message: "Invalid Todo Id Provided.",
    statusCode: 400
  });
});

app.listen("3000", () => {
  console.log("Started On Port 3000");
});

module.exports = {app};

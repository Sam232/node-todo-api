const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
const _ = require("lodash");

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

app.delete("/todos/:id", (req, res) => {
  todoID = req.params.id;

  if(ObjectID.isValid(todoID)){
    return Todo.findByIdAndRemove(todoID).then((doc) => {
      if(doc){
        return res.send({
          deletedTodo: doc,
          statusCode: 200
        });
      }

      res.status(404).send({
        message: "No Todo\'s ID Matches The Provided ID",
        statusCode: 404
      });

    })
    .catch((e) => {
      res.status(400).send({
        message: "Unable Process Request",
        statusCode: 400
      });
    });
  }

  res.status(400).send({
    message: "Invalid Todo ID Provided",
    statusCode: 400
  });
});

app.patch("/todos/:id/", (req, res) => {
  var todoID = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if(ObjectID.isValid(todoID)){
      if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
      }
      else{
        body.completedAt = null;
        body.completed = false
      }

      return Todo.findByIdAndUpdate(todoID, {
        $set: body
      }, {new: true}).then((doc) => {
        if(doc){
          return res.send({
            doc,
            statusCode: 200
          });
        }
        res.status(400).send({
          message: "No Todo\'s ID Matches The Provided ID",
          statusCode: 400
        });
      })
      .catch((e) => {
        res.status(400).send({
          message: "Unable To Process Request",
          statusCode: 400
        });
      });
  }

  res.status(400).send({
    message: "Invalid Todo ID Provided",
    statusCode: 400
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started On Port ${port}`);
});

module.exports = {app};

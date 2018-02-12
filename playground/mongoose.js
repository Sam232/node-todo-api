const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/MyTodo");

var Todo = mongoose.model("Todo", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: "Develop A Todo App",
  completed: true,
  completedAt: 22922793793920
});

newTodo.save().then((doc) => {
  console.log(doc);
})
.catch((e) => {
  console.log(e);
});

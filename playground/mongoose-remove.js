const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../server/models/Todo");

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({
//   _id: "5a9273ab91594c418397e7cf"
// }).then((doc) => {
//   console.log(doc);
// })
// .catch((e) => {
//   console.log(e);
// });

var todoID = "5a9274b891594c418397e81d";
Todo.findByIdAndRemove(todoID).then((doc) => {
  console.log(doc);
})
.catch((e) => {
  console.log(e);
});

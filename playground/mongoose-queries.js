const {ObjectID} = require("mongodb");

const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../server/models/Todo");
const {User} = require("../server/models/User");

// var id = "5a8d10a4b8c75d1ea43b3675";
//
// if(ObjectID.isValid(id)){
//   console.log("ID is valid.")
// }
// else{
//   console.log("ID is not valid");
// }
//
// Todo.find({
//   _id: id
// }).then((doc) => {
//   console.log("Todo:", doc)
// })
// .catch((err) => {
//   console.log(err);
// });
//
// Todo.findOne({
//   _id: id
// }).then((doc) => {
//   console.log("Todo", doc);
// })
// .catch((err) => {
//   console.log(err);
// });
//
// Todo.findById(id).then((doc) => {
//
//   console.log("Todo: ", doc);
// })
// .catch((err) => {
//   console.log(err);
// });

// var newUser = new User({
//   email: "sam@mail.com"
// });
//
// newUser.save().then((doc) => {
//   console.log("User: ", doc);
// })
// .catch((err) => {
//   console.log(err);
// });

var id = "5a8d206fecba0d10900fa9a8";
User.findById(id).then((doc) => {
  if(!doc){
    return console.log("User not found");
  }
  console.log("New User:", JSON.stringify(doc, undefined, 2));
})
.catch((err) => {
  console.log(err);
});

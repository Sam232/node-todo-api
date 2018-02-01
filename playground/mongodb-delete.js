const {MongoClient, ObjectId} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if(err){
    return console.log("Unable to connect to mongodb local database server");
  }

  //var db = client.db("TodoApp");

  // db.collection("todo").deleteMany({text: "Read my favourite book"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("Unable to delete todo", err);
  // });

  // db.collection("todo").deleteOne({text: "Read my favourite book"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // });

  // db.collection("todo").findOneAndDelete({text: "Read my favourite book"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // });

  var db = client.db("AllUsers");

  // db.collection("user").deleteMany({name: "Samuel Kobina Fiatse"}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log("Unable to delete users", err);
  // });

  db.collection("user").findOneAndDelete({_id: new ObjectId("5a6f149015d21d1e807e7373")}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

  client.close();

});

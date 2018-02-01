const {MongoClient, ObjectId} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if(err){
    return console.log("Unable to connect mongodb local database server");
  }

  var db = client.db("AllUsers");

  // db.collection("todo").find().toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch todos", err);
  // });

  // db.collection("todo").find({_id: new ObjectId("5a72bbfcb4a92898fe068b3d")}).toArray().then((docs) => {
  //   console.log("Uncompleted Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch todo", err);
  // });

  // db.collection("todo").find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log("Unable to count todos", err);
  // });

  db.collection("user").find({name: "Samuel Kobina Fiatse"}).toArray().then((docs) => {
    console.log("Users");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch users", err);
  });

  client.close();
});

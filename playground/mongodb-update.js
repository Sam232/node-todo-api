const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if(err){
    return console.log("Unable to connect to the mongodb local database server");
  }

  // var db = client.db("TodoApp");
  //
  // db.collection("todo").findOneAndUpdate({_id: new ObjectID("5a72dd5eb4a92898fe0694e9")}, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // });

  var db = client.db("AllUsers");

  db.collection("user").findOneAndUpdate({_id: new ObjectID("5a72f008b4a92898fe069b6f")}, {
    $set: {
      name: "Samuel Kobina Fiatse"
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

  client.close();
});

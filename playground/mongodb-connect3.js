const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if(err){
    return console.log("Unable to connect to the mongodb local database server.", err);
  }

  var db = client.db("AllUsers");

  db.createCollection("users", {
    validator: {
      "$or": [
        {"name": {"$type": "string"}},
        {"age": {"$type": "number"}},
        {"location": {"$type": "string"}}
      ]
    }
  }, (err, result) => {
    if(err){
      return console.log("Unable to create collection.", err);
    }
    db.collection("users").insertOne({
      name: "Samuel Kobina Fiatse",
      age: 22,
      location: "Takoradi"
    }, (err, result) => {
      if(err){
        return console.log("Unable to add new user data.", err)
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
      console.log(result.ops[0]._id.getTimestamp());

      client.close();
    });
  });


});

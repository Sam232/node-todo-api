const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if(err){
    return console.log("Unable to connect to the mongodb server.");
  }
  console.log("Connected to the mongodb server.");

  var db = client.db("Todos");

  db.createCollection("todo", {
    validator: {
      "$or": [
        {"name": {"$type": "string"}},
        {"completed": {"$in": ["Completed", "Incompleted"]}}
      ]
    }
  }, (err, result) => {
    if(err){
      return console.log("Unable to connect to mongodb server", err);
    }

    db.collection("todo").insertOne({
      text: "Something to do",
      completed: "Completed"
    }, (err, result) => {
      if(err){
        return console.log("Unable to add new todo.", err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
  });
});

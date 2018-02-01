//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectId} = require("mongodb");

var obj = new ObjectId();
console.log(obj)

var user = {name: "Samuel Kobina Fiatse", age: 22}
var {name} = user;

console.log(name);

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if(err){
    return console.log("Unable to connect to the mongodb local database server.");
  }

  var db = client.db("filemanager");

  db.collection("files").insertOne({
    name: "file1.docx",
    size: "2 MB"
  }, (err, result) => {
    if(err){
      return console.log("Unable to add document to the collection.");
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });
  client.close();

});

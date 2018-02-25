const request = require("supertest");
const expect = require("expect");
const {ObjectID} = require("mongoDB");

const {app} = require("../server");
const {Todo} = require("../models/Todo");

const todos = [{
  _id: new ObjectID(),
  text: "First test todo"
}, {
  _id: new ObjectID(),
  text: "Second test todo"
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done())
  .catch((err) => done(err));
});

describe("POST /todos", () => {
  it("should make a post request to this endpoint /todos", (done) => {
    request(app)
      .post("/todos")
      .send({
        text: "Create an App"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe("Create an App");
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos[2].text).toBe("Create an App");
          done();
        })
        .catch((err) => {
          done(err);
        })
      });
  });

  it("should make a post request to this endpoint /todos and receive back an error", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todo) => {
          expect(todo.length).toBe(2);
          done();
        })
        .catch((err) => {
          done(err);
        });
      });
  });
});

describe("GET /todo", () => {
  it("should make a get HTTP request to this endpoint /todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should make an HTTP GET request to this endpoint /todos/:id and fetch a single todo", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc._id).toBe(todos[0]._id.toHexString());
      })
      .end((err, res) => {
        if(err){
          return console.log(err);
          done(err);
        }
        done();
      });
  });

  it("should test for a todo having an invalid id", (done) => {
    request(app)
      .get("/todos/5a8d10a4b8c75d1ea43b3")
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        expect(res.body.message).toBe("Invalid Todo Id Provided.");
        done();
      })
  });

  it("should test for an id that matches no todo id", (done) => {
    var _id = new ObjectID();

    request(app)
      .get(`/todos/${_id.toHexString()}`)
      .expect(404)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        expect(res.body.message).toBe("No Todo's ID Matches The Provided ID.");
        done();
      })
  });
});

describe("DELETE /todos/:id", () => {
  it("should make a DELETE HTTP REQUEST to this endpoint /todos/:id and receive back the deleted todo", (done) => {
    var todoID = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${todoID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.deletedTodo._id).toBe(todoID);
      })
      .end((err,res) => {
        if(err){
          return done(err);
        }

        Todo.findById(todoID).then((doc) => {
          expect(doc).toNotExist();
          done();
        })
        .catch((e) => {
          done(e);
        });
      });
  });

  it("should make a DELETE HTTP REQUEST to this endpoint /todos/:id and receive invalid id as error message", (done) => {
    request(app)
      .delete("/todos/5a92ad5d517e2b0014dfb9")
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        done();
      });
  });

  it("should make a DELETE HTTP REQUEST to this endpoint /todos/:id and receive back 404 as error message", (done) => {
    request(app)
      .delete("/todos/5a92ad5d517e2b0014dfb9d1")
      .expect(404)
      .end((err, res) => {
        if(err){
          done(err);
        }
        done();
      });
  });
});

const request = require("supertest");
const expect = require("expect");

const {app} = require("../server");
const {Todo} = require("../models/Todo");

const todos = [{
  _id: "5a8d10a4b8c75d1ea43b3675",
  text: "First test todo"
}, {
  _id: "5a8d10a4b8c75d1ea43b3678",
  text: "Second test todo"
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done())
  .catch((err) => done(err));
});

describe("Node Todo API First Test", () => {
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
});

describe("Node Todo API Second Test", () => {
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

describe("Node API Third Test", () => {
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

describe("Node API Fourth Test", () => {
  it("should make an HTTP GET request to this endpoint /todos/:id and fetch a single todo", (done) => {
    request(app)
      .get("/todos/5a8d10a4b8c75d1ea43b3675")
      .expect(200)
      .expect((res) => {
        expect(res.body[0]._id).toBe("5a8d10a4b8c75d1ea43b3675");
      })
      .end((err, res) => {
        if(err){
          return console.log(err);
          done(err);
        }
        done();
      });
  });
});

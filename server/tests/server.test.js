const request = require("supertest");
const expect = require("expect");

const {app} = require("../server");
const {Todo} = require("../models/Todo");

const todos = [{
  text: "First test todo"
}, {
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

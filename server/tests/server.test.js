const request = require("supertest");
const expect = require("expect");

const {app} = require("../server");
const {Todo} = require("../models/Todo");

beforeEach((done) => {
  Todo.remove({}).then(() => done())
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
          expect(todos.length).toBe(1);
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
          expect(todo.length).toBe(0);
          done();
        })
        .catch((err) => {
          done(err);
        });
      });
  });
});

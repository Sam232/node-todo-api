const request = require("supertest");
const expect = require("expect");

const {app} = require("../server");

describe("Node API Test", () => {
  it("should make an HTTP GET request to this endpoint /todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        done();
      });
  });
});

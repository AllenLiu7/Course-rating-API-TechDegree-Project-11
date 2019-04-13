const assert = require("assert");
const request = require("supertest");
const app = require("../src/index");

describe("the express app", () => {
  it("handles a GET request to /api/users", done => {
    request(app)
      .get("/api/users")
      .end((err, res) => {
        assert(res.body.hi === 123);
      });
    done();
  });
});

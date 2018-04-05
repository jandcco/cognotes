const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const resetDb = require("../utilities/resetDb");
const app = require("../../src/server");
const CreateUser = require("../../src/database/Actions/CreateUser");


chai.use(chaiHttp);

describe("note routes", () => {
  before("reset db", async () => {
    resetDb();
  });
  describe("Post /note", () => {
    let response;
    before("make request", () => {
      return chai.request(app)
        .post("/note")
        .send({title: "A note on post routes", text:"This one is working"})
        .then(res => response = res);
    });
    it("returns response 200", () => {
      expect(response.status).to.equal(200);
    });
    it("returns results with expected title", () => {
      expect(response.body.title).to.equal("A note on post routes");
    });
  });
});

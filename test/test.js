const chai = require("chai");
const chaiHttp = require("chai-http");
const res = require("express/lib/response");
const app = require("../app");
const seedDB = require("../data/seed-test");

chai.should();

chai.use(chaiHttp);

describe("Testing the Vested Back-End", () => {
  beforeEach(async () => {
    await seedDB();
  });
  describe("/GET/Polygon", () => {
    it("Fetches all polygon data", (done) => {
      chai
        .request(app)
        .get("/api/polygon")
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(200);
          result.should.have.lengthOf(374);
          done();
        });
    });
  });
  describe("/GET/Users", () => {
    it("Fetches all User data", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(200);
          result.should.have.lengthOf(2);
          done();
        });
    });
  });
  describe("/GET/ESG", () => {
    it("Fetches all ESG data", (done) => {
      chai
        .request(app)
        .get("/api/ESG")
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(200);
          result.should.have.lengthOf(28);
          done();
        });
    });
  });
  describe("GET /api/:username/:portfolio", () => {
    it("Fetches the users's portfolios", (done) => {
      chai
        .request(app)
        .get("/api/jessjelly/portfolio1")
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(200);
          result.tickers.should.eql(["COST", "ABT", "ANET", "FR", "A"]);
          done();
        });
    });
  });
  describe("PATCH /api/:username/:portfolio", () => {
    it("sets the specfied portfolio array to empty", (done) => {
      chai
        .request(app)
        .patch("/api/jessjelly/portfolio1")
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(200);
          result.tickers.should.eql([]);
          done();
        });
    });
  });
  describe("PATCH /API/Users/:username/:formAnswers", () => {
    it("Status 201 - Overwrites a users form responses on their user profile", (done) => {
      const username = "jessjelly";
      const formAnswers = "formAnswers1";
      const formResponses = {
        environmentalRating: 1,
        socialRating: 1,
        governanceRating: 3,
      };
      chai
        .request(app)
        .patch(`/api/users/${username}/${formAnswers}`)
        .send({ formResponses })
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(201);
          result.formAnswers1.environmentalRating.should.equal(1);
          result.formAnswers1.socialRating.should.equal(1);
          result.formAnswers1.governanceRating.should.equal(3);
          done();
        });
    });
    it("Status 404 - Incorrect username format", (done) => {
      const username = "jessjelly123";
      const formAnswers = "formAnswers1";
      const formResponses = {
        environmentalRating: 1,
        socialRating: 1,
        governanceRating: 3,
      };
      chai
        .request(app)
        .patch(`/api/users/${username}/${formAnswers}`)
        .send({ formResponses })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.eql({ msg: "Bad request." });
          done();
        });
    });
  });
  describe.only("/POST/Users", () => {
    it("Creates a new user", (done) => {
      const username = "TEST";
      const email = "test@gmail.com";
      const avatarUrl = "./profile_pic.jpeg";
      const newUser = true;
      const theme = "light";
      const achievements = [];
      const form_answers = {
        environmentalRating: 0,
        socialRating: 5,
        governanceRating: 5,
      };
      const emptyForm = {
        environmentalRating: 0,
        socialRating: 0,
        governanceRating: 0,
      };
      const emptyPortfolio = { tickers: "" };

      chai
        .request(app)
        .post("/api/users")
        .send({
          username,
          email,
          avatarUrl,
          newUser,
          theme,
          achievements,
          form_answers,
          emptyForm,
          emptyPortfolio,
        })
        .end((err, res) => {
          const { result } = res.body;
          res.should.have.status(200);
          res.body.should.have.property("user").eql("New User Created");
          // res.body.user.should.be.a("string");
          // res.body.should.be.a("object");
          // res.body.user.should.be("New User Created");
          done();
        });
    });
  });
});

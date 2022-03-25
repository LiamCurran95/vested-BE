const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

//ERRORS
const errors = require("./controllers/errors.controller");

//POLYGON
const { getPolygon } = require('./controllers/polygon.controller');

//ESG
const { getESG } = require('./controllers/esg.controller');

//USERS

const {
  getUsers,
  getUserByUsername,
  getPortfolioByUsername, postUserAnswers
} = require('./controllers/users.controller');

//POLYGON
app.get('/api/polygon', getPolygon);

//ESG
app.get('/api/ESG', getESG);

//USERS
app.get("/api/users", getUsers);
app.get("/api/users/:username", getUserByUsername);
app.get('/api/:username/:portfolio', getPortfolioByUsername);
app.patch("/api/users/:username/:formAnswers", postUserAnswers);

app.listen(process.env.port || 9090, () => {
  console.log('Server online..');
});

app.use(errors.mongooseErrors);

module.exports = app;

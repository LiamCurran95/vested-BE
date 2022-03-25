const express = require('express');

const app = express();
app.use(express.json());

//POLYGON
const { getPolygon } = require('./controllers/polygon.controller');

//ESG
const { getESG } = require('./controllers/esg.controller');

//USERS
const {
  getUsers,
  getUserByUsername,
  getPortfolioByUsername,
  emptyPortfolio,
} = require('./controllers/users.controller');

//POLYGON
app.get('/api/polygon', getPolygon);

//ESG
app.get('/api/ESG', getESG);

//USERS
app.get('/api/users', getUsers);
app.get('/api/users/:username', getUserByUsername);
app.get('/api/:username/:portfolio', getPortfolioByUsername);
app.patch('/api/:username/:portfolio', emptyPortfolio);

app.listen(process.env.port || 9090, () => {
  console.log('Server online..');
});

module.exports = app;

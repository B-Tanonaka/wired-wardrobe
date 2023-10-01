const router = require('express').Router();
const axios = require('axios');
const cart = require('./cartRoutes');
const products = require('./productsRoutes');
const questions = require('./questionsRoutes');
const reviews = require('./reviewsRoutes');

module.exports.cart = cart;
module.exports.products = products;
module.exports.questions = questions;
module.exports.reviews = reviews;
module.exports.interactions = router.post('/interactions', (req, res) => {
  axios.post(`${process.env.ATLIER_API_ROUTE}/interactions?element=${req.params.element}&widget=${req.params.widget}&time=${req.params.time}`, {
    headers: {
      Authorization: process.env.GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(201).send('Content created');
    })
    .then((err) => {
      res.status(422).send(err);
    });
});

const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('in server/routes/followAllInfluencer.router.js GET');
  const queryString = `SELECT * FROM follows;`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;

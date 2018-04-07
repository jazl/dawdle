var express = require('express');
var router = express.Router();
var { MongoClient } = require('mongodb');

const title = process.env.TITLE;

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = process.env.URL;
  const user = process.env.USER;
  const password = process.env.PASSWORD;
  const dbname = 'library';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url, {auth:{user,password}});
      const db = client.db(dbname);
      const response = await db.collection('books').find().toArray();
      res.json(response);
    }
    catch(err){
      console.log(err);
    }
  }());
});

module.exports = router;

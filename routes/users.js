var express = require('express');
var router = express.Router();
var pg = require('pg');

var conString = "postgres://postgres:postgres@localhost/sample"

/* GET users listing. */
router.get('/', function(req, res, next) {

  pg.connect(conString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    client.query('SELECT * FROM users', [], function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return res.status(500).json({ success: false, data: err});
      }

      // return results as json object
      return res.json(result.rows)
    });
  });
});

module.exports = router;

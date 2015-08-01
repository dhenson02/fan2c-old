var express = require('express');
var router = express.Router();
var api = require("../remote-api");
var db = require("../bin/db");

/* GET home page. */
router.get('/', function ( req, res ) {
  res.render('index', { title: 'Express' });
});

router.get('/:league?q=players', function ( req, res ) {
  api.L = req.params("league");
  var typeStr = req.query("q");
  db.pullAll( typeStr, function ( dbRes ) {
    res.send(JSON.stringify(dbRes));
  });
});

module.exports = router;

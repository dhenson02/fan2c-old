var express = require('express');
var router = express.Router();
var api = require("../remote-api");
var db = require("../bin/db");

router.get('/', function ( req, res ) {
  res.render('index', { title: 'Express' });
});

router.get('/:q', function ( req, res ) {
  var typeStr = req.param("q");
  db.pullAll( typeStr, function ( dbRes ) {
    res.send(JSON.stringify(dbRes));
  });
});

module.exports = router;

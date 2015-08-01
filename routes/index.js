var express = require('express');
var router = express.Router();
var db = require("../bin/db");

router.get('/', function ( req, res ) {
  res.render('index', { title: 'Express' });
});

router.get('/:q', function ( req, res ) {
  var typeStr = req.params.q;
  console.log(typeStr);
  db.pullAll(typeStr, function ( err, docs ) {
    res.send(err);
  });
});

module.exports = router;

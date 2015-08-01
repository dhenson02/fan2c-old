var express = require('express');
var router = express.Router();
var api = require("../remote-api");

router.get('/', function ( req, res ) {
  res.render('index', { title: 'Express' });
});

router.get('/nbw/:q', function ( req, res ) {
  var typeStr = req.params.q;
  console.log(typeStr);
  res.render('index', { title: "Ballin", data: api.players });
  //res.send(api.players);
});

module.exports = router;

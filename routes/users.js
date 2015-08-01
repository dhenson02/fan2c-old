var express = require('express');
var router = express.Router();
var api = require('../remote-api');

router.get('/me', function( req, res ) {
  res.send("yeah - userssssssss");
});

module.exports = router;

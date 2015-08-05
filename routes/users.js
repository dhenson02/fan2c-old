var express = require('express');
var router = express.Router();

router.get('/users', function( req, res ) {
  res.send("yeah - userssssssss");
});

module.exports = router;

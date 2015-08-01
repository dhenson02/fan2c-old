var express = require('express');
var router = express.Router();
var api = require('../remote-api'); // <-- keeps the URL and league ID handy

/* GET users listing. */
router.get('/me', function(req, res, next) {
  res.send("yeah - " + api);
});

module.exports = router;

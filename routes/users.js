var express = require('express');
var router = express.Router();
var api = require('../remote-api'); // <-- keeps the URL and league ID handy

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send("yeah" + api.remoteURL);
});

module.exports = router;

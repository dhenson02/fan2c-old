var express = require('express');
var router = express.Router();
var app = require('../remote-api'); // <-- keeps the URL and league ID handy

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("yeah" + app.remoteURL);
});

module.exports = router;

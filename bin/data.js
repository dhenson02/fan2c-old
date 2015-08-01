"use strict";
var api = require('../remote-api');
var http = require('http');

module.exports = {
  refresh: function ( callback ) {
    var req = http.request(api, function ( res ) {
      var dataStr = "";
      res.on("data", function ( d ) {
        dataStr += d;
      });
      res.on("end", function () {
        var data = JSON.parse(dataStr);
        callback(data);
      });
    });
    req.on("error", function ( error ) {
      console.log(error);
    });
    req.end();
  }
};

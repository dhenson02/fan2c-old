"use strict";
var api = require('../remote-api');
var http = require('http');

module.exports = {
  refresh: function ( typeStr, argObj, callback ) {
    var req = http.request({
      host: api.host,
      port: api.port,
      headers: api.headers,
      path: api.path(typeStr, argObj)
    }, function ( res ) {
      var dataStr = "";
      res.on("data", function ( d ) {
        dataStr += d;
      });
      res.on("end", function () {
        var data = JSON.parse(dataStr);
        callback(typeStr, data);
      });
    });
    req.on("error", function ( error ) {
      console.log(error);
    });
    req.end();
  }
};

var api = require('./remote-api');
var http = require('http');
var _ = require("lodash");
var options = {
  host: api.host,
  port: api.port,
  headers: api.headers,
  path: null
};

module.exports = {
  refresh: function ( typeStr, argObj, callback ) {
    options.path = api.path(typeStr, argObj);
    console.log("refreshing from outside source");
    var req = http.request(options, function ( res ) {
      var dataStr = "";
      res.on("data", function ( d ) {
        dataStr += d;
      });
      res.on("end", function () {
        var data = JSON.parse(dataStr);
        var innerKey = api.types[typeStr][1];
        var innerArray = data[typeStr][innerKey];
        innerArray = innerArray.map(function( obj ) {
          return _.forOwn(obj, function ( val, key, obj ) {
            var parsed = Number(val);
            obj[key] = _.isNaN(parsed) ? val : parsed;
            return obj[key];
          });
        });
        callback(typeStr, innerArray);
      });
    });
    req.on("error", function ( error ) {
      console.error(error);
    });
    req.end();
  }
};

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
    console.log("refreshing from outside source");

    //TEMP DEBUG
    if ( typeStr === "liveScoring" ) {
      options.path = "/2014/export?TYPE=liveScoring&L=19121&W=12&JSON=1&DETAILS=1";
    }
    else if ( typeStr === "rosters" ) {
      options.path = "/2014/export?TYPE=rosters&L=19121&W=12&JSON=1"
    }
    else if ( typeStr === "league" ) {
      options.path = "/2014/export?TYPE=league&L=19121&JSON=1";
    }
    else {
      options.path = api.path(typeStr, argObj);
    }

    console.log(options.path);

    var req = http.request(options, function ( res ) {
      var dataStr = "";
      res.on("data", function ( d ) {
        dataStr += d;
      });
      res.on("end", function () {
        var data = JSON.parse(dataStr);
        if ( typeStr !== "league" ) {
          var innerKey = api.types[typeStr][1];
          var innerArray = data[typeStr][innerKey];
          innerArray = innerArray.map(function ( obj ) {
            return _.forOwn(obj, function ( val, key, obj ) {
              var parsed = Number(val);
              obj[key] = _.isNaN(parsed) ? val : parsed;
              return obj[key];
            });
          });
        }
        callback(typeStr, innerArray||data[typeStr]);
      });
    });
    req.on("error", function ( error ) {
      console.error(error);
    });
    req.end();
  }
};

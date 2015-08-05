var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/testffl";
var api = require("./remote-api");
var _ = require("lodash");

function push ( typeStr, data, callback ) {
  mongo.connect(url, function ( err, db ) {
    var col = db.collection(typeStr);
    var chunk;
    while ( ( chunk = data.slice(0, 1000) ).length > 0 ) {
      col.insertMany(chunk, function ( res ) {
        callback(res);
        if ( chunk == data ) {
          db.close();
        }
      });
      data = data.slice(1000);
    }
  });
}

function init ( callback ) {
  mongo.connect(url, function ( err, db ) {
    var players = db.collection("players");
    var all = {};
    players.find({}).toArray(function ( err, players ) {
      var adp = db.collection("adp");
      all.players = players;
      adp.find({})
        .limit(250)
        .sort({averagePick: 1})
        .toArray(function ( err, adp ) {
          var a = 0, total = adp.length;
          for (; a < total; ++a ) {
            adp[a] = _.merge(
              _.where(players, { id: adp[a].id }).pop(),
              adp[a]
            );
          }
          all.adp = adp;
          callback(all);
          db.close();
        });
    });
  });
}

module.exports = {
  push: push,
  init: init
};

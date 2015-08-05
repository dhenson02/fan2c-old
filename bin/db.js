var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/testffl";
var api = require("./remote-api");
var _ = require("lodash");
var data = require("./data");

function pushPlayers ( typeStr, dataSet, callback ) {
  mongo.connect(url, function ( err, db ) {
    var col = db.collection(typeStr);
    var chunk;
    // Mongo won't take more than 1000 docs at a time.
    while ( ( chunk = dataSet.slice(0, 1000) ).length > 0 ) {
      col.insertMany(chunk, function ( res ) {
        callback(res);
        if ( chunk == dataSet ) {
          db.close();
        }
      });
      dataSet = dataSet.slice(1000);
    }
  });
}

function init ( callback ) {
  mongo.connect(url, function ( err, db ) {
    var players = db.collection("players");
    var all = {};
    players.find({}).toArray(function ( err, docs ) {
      var adp = db.collection("adp");
      all.players = docs;
      api.data["players"] = docs;
      adp.find({})
        .limit(250)
        .sort({averagePick: 1})
        .toArray(function ( err, docs ) {
          var a = 0, total = docs.length;
          for (; a < total; ++a ) {
            docs[a] = _.merge(
              _.where(api.data.players, { id: docs[a].id }).pop(),
              docs[a]
            );
          }
          all.adp = docs;
          api.data["adp"] = docs;
          callback(all);
          db.close();
        });
    });
  });
}

function pull ( typeStr, callback ) {
  mongo.connect(url, function ( err, db ) {
    var dbData = db.collection(typeStr);
    dbData.find({}).toArray(function ( err, docs ) {
      if ( !docs.length ) {
        console.log("!docs.length in db.pull, docs = ", docs);
        data.refresh(typeStr, null, function ( typeStr, dataSet ) {
          api.data[typeStr] = dataSet;
          console.log("now refreshed, dataSet for " + typeStr + " = ", dataSet);
          dbData.insertMany(dataSet, callback);
          db.close();
        });
      }
      else {
        api.data[typeStr] = docs;
        callback(docs);
        db.close();
      }
    });
  });
}

module.exports = {
  pushPlayers: pushPlayers,
  init: init,
  pull: pull
};

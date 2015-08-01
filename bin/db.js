"use strict";
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/testffl";

module.exports = {
  pullAll: function ( callback ) {
    mongo.connect(url, function ( db ) {
      var player = db.collection("players").find();
      player.each(function ( err, doc ) {
        callback(doc);
      });
      db.close();
    });
  },
  push: function ( data, callback ) {
    mongo.connect(url, function ( err, db ) {
      var players = db.collection("players");
      var chunk;
      while ((chunk = data.slice(0, 1000)).length > 0) {
        players.insertMany(chunk, function ( err, res ) {
          callback(err || res);
          if ( chunk == data ) {
            db.close();
          }
        });
        data = data.slice(1000);
      }
    });
  }
};

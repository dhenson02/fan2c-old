"use strict";
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/testffl";
var api = require("../remote-api");

module.exports = {
  push: function ( typeStr, data, callback ) {
    var innerKey = api.types[typeStr][1];
    var innerArray = data[typeStr][innerKey];
    mongo.connect(url, function ( err, db ) {
      var col = db.collection(typeStr);
      var chunk;
      while ( ( chunk = innerArray.slice(0, 1000) ).length > 0 ) {
        col.insertMany(chunk, function ( err ) {
          if ( err ) {
            console.error(err);
          }
          if ( chunk == innerArray ) {
            db.close();
            callback();
          }
        });
        innerArray = innerArray.slice(1000);
      }
    });
  },
  pullAll: function ( typeStr, callback ) {
    mongo.connect(url, function ( err, db ) {
      var docs = db.collection(typeStr);
      docs.find({}).toArray(function ( err, docs ) {
        callback(docs);
        db.close();
      });
    });
  }
};

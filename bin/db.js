var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/testffl";
var api = require("./remote-api");

function push ( typeStr, data, callback ) {
  var innerKey = api.types[typeStr][1];
  var innerArray = data[typeStr][innerKey];
  mongo.connect(url, function ( err, db ) {
    var col = db.collection(typeStr);
    var chunk;
    while ( ( chunk = innerArray.slice(0, 1000) ).length > 0 ) {
      col.insertMany(chunk, function ( res ) {
        callback(res);
        if ( chunk == innerArray ) {
          db.close();
        }
      });
      innerArray = innerArray.slice(1000);
    }
  });
}

function pullAll ( typeStr, callback ) {
  mongo.connect(url, function ( err, db ) {
    var docs = db.collection(typeStr);
    docs.find({}).toArray(function ( err, docs ) {
      callback(docs);
      db.close();
    });
  });
}

module.exports = {
  push: push,
  pullAll: pullAll
};

"use strict";

var React = require("react");
var MainView = require("../views/MainView");
var MainElement = document.getElementById("main");
var socket = require("socket.io-client")();
var Store = require("../views/Store");
var omit = require("lodash/object/omit");

socket.on("initialize", function (data) {
  Store.league = data.league;
  Store.adp = data.adp;
  var i = 0,
      players = data.players,
      total = players.length;
  for (; i < total; ++i) {
    Store.players[players[i].id] = omit(players[i], ["_id", "id"]);
  }
  var franchises = data.league.franchises.franchise;
  total = franchises.length;
  i = 0;
  for (; i < total; ++i) {
    Store.franchises[franchises[i].id] = omit(franchises[i], ["_id", "id"]);
  }
  var handleClick = function handleClick(event, callback) {
    console.log("deeper click");
    var typeStr = event.target.getAttribute("data-target");
    socket.emit("client-pull", typeStr, callback);
  };

  React.render(React.createElement(MainView, { onClick: handleClick }), MainElement);
});

socket.on("data-change", function (data) {
  console.log("data-change:", data);
});

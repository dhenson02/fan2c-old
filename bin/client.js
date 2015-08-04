"use strict";

var React = require("react");
var socket = require("socket.io-client")();
var MainView = require("../views/main");

function pull(typeStr) {
  socket.emit("client-pull", typeStr);
}

socket.on("init", function (data) {
  React.render(React.createElement(MainView, { data: data }), document.getElementById("main"));
});

module.exports = {
  socket: socket,
  pull: pull
};

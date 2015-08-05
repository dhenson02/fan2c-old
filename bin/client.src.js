var React = require("react");
var MainView = require("../views/MainView");
var MainElement = document.getElementById("main");
var socket = require("socket.io-client")();

function handleClick ( event ) {
  event.preventDefault();
  event.stopPropagation();
  var typeStr = event.target.id;
  console.log("clicked the big button");
  socket.emit("client-pull", typeStr);
}

socket.on("initialize", function ( data ) {
  React.render(
    <MainView dataSet={data}
      handleClick={handleClick.bind(this)} />,
    MainElement
  );
});

socket.on("data-change", function ( data ) {
  console.log("data-change:", data);
});

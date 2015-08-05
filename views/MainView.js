"use strict";

var React = require("react");
var PlayerView = require("./PlayerView");

module.exports = React.createClass({
  displayName: "exports",

  getInitialState: function getInitialState() {
    return {
      players: [],
      adp: []
    };
  },

  componentDidMount: function componentDidMount() {
    var players = this.props.dataSet["players"],
        adp = this.props.dataSet["adp"];
    this.setState({
      players: players,
      adp: adp
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "a",
        { onClick: this.props.handleClick,
          href: "#",
          className: "button button-primary",
          id: "adp" },
        "ADP"
      ),
      React.createElement(PlayerView, { dataSet: this.state.adp, title: "Players" })
    );
  }
});

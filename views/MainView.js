"use strict";

var React = require("react");
var PlayersView = require("./PlayersView");
var LiveScoringView = require("./LiveScoringView");
var Store = require("./Store");

var MainView = React.createClass({
  displayName: "MainView",

  getInitialState: function getInitialState() {
    return {
      dataSet: [],
      view: ""
    };
  },

  handleClick: function handleClick(event) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick(event, function (typeStr, dataSet) {
      self.setState({
        view: typeStr,
        dataSet: dataSet
      });
    });
  },

  componentWillMount: function componentWillMount() {
    this.setState({
      view: "players"
    });
  },

  render: function render() {
    if (this.state.view === "liveScoring") {
      var display = "block";
      var scores = React.createElement(LiveScoringView, {
        dataSet: this.state.dataSet,
        title: "Live Scoring",
        style: { display: display } });
    } else {
      display = "none";
      scores = React.createElement("div", null);
    }
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "a",
        { onClick: this.handleClick,
          href: "#",
          className: "button button-primary",
          "data-target": "liveScoring",
          id: "scores-btn" },
        "Live Scoring"
      ),
      React.createElement(PlayersView, {
        dataSet: Store.adp,
        title: "Players" }),
      scores
    );
  }
});

module.exports = MainView;

"use strict";

var React = require("react");
var Store = require("./Store");
var players = Store.players;
var franchises = Store.franchises;

var LiveScoringView = React.createClass({
  displayName: "LiveScoringView",

  render: function render() {
    var matchUps = this.props.dataSet.map(function (matchUp, i) {
      return React.createElement(MatchUp, { key: i, franchises: matchUp });
    });
    return React.createElement(
      "div",
      { id: "liveScoring", className: "twelve columns" },
      matchUps
    );
  }
});

var MatchUp = React.createClass({
  displayName: "MatchUp",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(FranchiseScore, { key: 0, franchise: this.props.franchises.franchise[0], className: "six columns u-pull-left" }),
      React.createElement(FranchiseScore, { key: 1, franchise: this.props.franchises.franchise[1], className: "six columns u-pull-right" })
    );
  }
});

var FranchiseScore = React.createClass({
  displayName: "FranchiseScore",

  render: function render() {
    var franchise = this.props.franchise;
    var lineup = franchise.players.player.map(function (player, i) {
      console.log(player);
      return React.createElement(PlayerScore, { key: i, name: Store.players[Number(player.id)].name, score: player.score });
    });
    return React.createElement(
      "table",
      { className: this.props.className },
      React.createElement(
        "caption",
        null,
        franchises[franchise.id].name + " [ " + franchise.score + " points ]"
      ),
      React.createElement(
        "thead",
        null,
        React.createElement(
          "th",
          null,
          "Player"
        ),
        React.createElement(
          "th",
          null,
          "Score"
        )
      ),
      React.createElement(
        "tbody",
        null,
        lineup
      )
    );
  }
});

var PlayerScore = React.createClass({
  displayName: "PlayerScore",

  render: function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.name
      ),
      React.createElement(
        "td",
        null,
        this.props.score
      )
    );
  }
});

module.exports = LiveScoringView;

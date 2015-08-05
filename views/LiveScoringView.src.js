var React = require("react");
var Store = require("./Store");
var players = Store.players;
var franchises = Store.franchises;

var LiveScoringView = React.createClass({
  render () {
    var matchUps = this.props.dataSet.map(function( matchUp, i ) {
      return <MatchUp key={i} franchises={matchUp} />;
    });
    return (
      <div id="liveScoring" className="twelve columns">
        {matchUps}
      </div>
    );
  }
});

var MatchUp = React.createClass({
  render () {
    return (
      <div className="row">
        <FranchiseScore key={0} franchise={this.props.franchises.franchise[0]} className="six columns u-pull-left"/>
        <FranchiseScore key={1} franchise={this.props.franchises.franchise[1]} className="six columns u-pull-right"/>
      </div>
    );
  }
});

var FranchiseScore = React.createClass({
  render () {
    var franchise = this.props.franchise;
    var lineup = franchise.players.player.map(function( player, i ) {
      console.log(player);
      return <PlayerScore key={i} name={Store.players[Number(player.id)].name} score={player.score} />;
    });
    return (
      <table className={this.props.className}>
        <caption>{franchises[franchise.id].name + " [ " + franchise.score + " points ]"}</caption>
        <thead>
          <th>Player</th>
          <th>Score</th>
        </thead>
        <tbody>
        {lineup}
        </tbody>
      </table>
    );
  }
});

var PlayerScore = React.createClass({
  render () {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.score}</td>
      </tr>
    );
  }
});

module.exports = LiveScoringView;

var React = require("react");
var client = require("../bin/client");
var DataView = require("./DataView");

module.exports = React.createClass({
  getInitialState () {
    return {
      players: [],
      adp: [],
      combo: [] 
    }
  },

  componentDidMount () {
    var players = this.props.data["players"],
      adp = this.props.data["adp"],
      combo = adp.map(function ( player ) {
        player.name = players[player.id].name;
        player.team = players[player.id].team;
        player.position = players[player.id].position;
        player.status = players[player.id].status;
        return player;
      }).sort("averagePick");
    this.setState({
      players: players,
      adp: adp,
      combo: combo
    });
  },

  handleClick ( event ) {
    event.preventDefault();
    event.stopPropagation();
    var typeStr = event.target.id;
    client.pull(typeStr);
  },

  render () {
    return (
      <div>
        <button key="a" onClick={this.handleClick} id="players" type="button">Players</button>
        <button key="b" onClick={this.handleClick} id="adp" type="button">ADP</button>
        <DataView
          data={this.state.combo}
          title="combo" />
      </div>
    );
  }
});


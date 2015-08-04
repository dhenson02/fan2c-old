var React = require("react");
var socket = require("../bin/client").socket;

var MainView = React.createClass({
  getInitialState () {
    return {
      players: [],
      adp: [],
      combo: []
    }
  },

  componentDidMount () {
    var players = this.props.data["players"],
      adp = this.props.data["adp"];
    console.log(players[0]);
    console.log(adp[0]);
    this.setState({
      players: players,
      adp: adp,
      combo: adp.map(function ( player ) {
        console.log(players[player.id]);
        player.name = players[player.id].name;
        player.team = players[player.id].team;
        player.position = players[player.id].position;
        player.status = players[player.id].status;
        return player;
      }).sort("averagePick")
    });
  },

  handleClick ( event ) {
    event.preventDefault();
    event.stopPropagation();
    var typeStr = event.target.id;
    socket.emit("client-pull", typeStr);
  },

  render () {
    var data = [],
      name;
    for ( name in this.props.data ) {
      if ( this.props.data.hasOwnProperty(name) ) {
        data.push(
          <DataView
            key={name}
            data={this.props.data[name]}
            title={name} />
        );
      }
    }
    return (
      <div>
        <button key="a" onClick={this.handleClick} ref="players" id="players" type="button">Players</button>
        <button key="b" onClick={this.handleClick} ref="adp" id="adp" type="button">ADP</button>
        {data}
      </div>
    );
  }
});

var DataView = React.createClass({
  render () {
    var self = this;
    var fields = Object.keys(this.props.data);
    console.log(fields);
    var data = fields.map(function(field, index) {
        return (
          <li data-id={index}>{field + ": " + JSON.stringify(self.props.data[index])}</li>
        )
      });
    return (
      <div>
        {this.props.title}
        <ul>{data}</ul>
      </div>
    );
  }
});

module.exports = {
  MainView: MainView,
  DataView: DataView
};

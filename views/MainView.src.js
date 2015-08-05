var React = require("react");
var PlayerView = require("./PlayerView");

module.exports = React.createClass({
  getInitialState () {
    return {
      players: [],
      adp: []
    }
  },

  componentDidMount () {
    var players = this.props.dataSet["players"],
      adp = this.props.dataSet["adp"];
    this.setState({
      players: players,
      adp: adp
    });
  },

  render () {
    return (
      <div className="row">
        <a onClick={this.props.handleClick}
          href="#"
          className="button button-primary"
          id="adp">ADP</a>
        <PlayerView dataSet={this.state.adp} title="Players" />
      </div>
    );
  }
});


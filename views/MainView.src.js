var React = require("react");
var PlayersView = require("./PlayersView");
var LiveScoringView = require("./LiveScoringView");
var Store = require("./Store");

var MainView = React.createClass({
  getInitialState () {
    return {
      dataSet: [],
      view: ""
    }
  },

  handleClick ( event ) {
    var self = this;
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick( event, function ( typeStr, dataSet ) {
      self.setState({
        view: typeStr,
        dataSet: dataSet
      });
    });
  },

  componentWillMount () {
    this.setState({
      view: "players"
    });
  },

  render () {
    if ( this.state.view === "liveScoring" ) {
      var display = "block";
      var scores = (
        <LiveScoringView
          dataSet={this.state.dataSet}
          title="Live Scoring"
          style={{display: display}} />
      );
    }
    else {
      display = "none";
      scores = <div/>;
    }
    return (
      <div className="row">
        <a onClick={this.handleClick}
          href="#"
          className="button button-primary"
          data-target="liveScoring"
          id="scores-btn">Live Scoring</a>
        <PlayersView
          dataSet={Store.adp}
          title="Players" />
        {scores}
      </div>
    );
  }
});

module.exports = MainView;

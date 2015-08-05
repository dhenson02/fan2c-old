var React = require("react");
var Store = require("./Store");
var players = Store.players;

var PlayersView = React.createClass({
  handleClick ( event ) {
    event.preventDefault();
    event.stopPropagation();
  },

  render () {
    var self = this;
    var data = self.props.dataSet.map(function( obj, i ) {
      return (
        <li key={i} style={{float: "left"}}>
          <a className="button"
            href="#"
            data-id={obj["id"]}
            onClick={self.handleClick}>{obj["name"]}</a>
        </li>
      )
    });
    return <ul className="twelve columns" style={{listStyleType: "none" }}>{data}</ul>;
  }
});

module.exports = PlayersView;

var React = require("react");

module.exports = React.createClass({
  render () {
    var self = this;
    var fields = Object.keys(this.props.data);
    var data = fields.map(function( field, index ) {
      return (
        <li key={index} data-id={index}>{field + ": " + JSON.stringify(self.props.data[index])}</li>
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

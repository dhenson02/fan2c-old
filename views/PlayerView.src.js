var React = require("react");

module.exports = React.createClass({
  handleClick ( event ) {
    event.preventDefault();
    event.stopPropagation();
    console.log("data-id: " + event.currentTarget.getAttribute("data-id"));
  },

  render () {
    var self = this;
    var data = self.props.dataSet.map(function( obj, i ) {
      return (
        <li key={i}>
          <a className="button"
            href="#"
            data-id={obj["id"]}
            onClick={self.handleClick}>{obj["name"]}</a>
        </li>
      )
    });
    return (
      <div>
        {self.props.title}
        <ul style={{listStyleType: "none" }}>{data}</ul>
      </div>
    );
  }
});

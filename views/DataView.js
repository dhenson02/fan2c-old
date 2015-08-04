"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName: "exports",

  render: function render() {
    var self = this;
    var fields = Object.keys(this.props.data);
    var data = fields.map(function (field, index) {
      return React.createElement(
        "li",
        { key: index, "data-id": index },
        field + ": " + JSON.stringify(self.props.data[index])
      );
    });
    return React.createElement(
      "div",
      null,
      this.props.title,
      React.createElement(
        "ul",
        null,
        data
      )
    );
  }
});

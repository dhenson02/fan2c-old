"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName: "exports",

  handleClick: function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("data-id: " + event.currentTarget.getAttribute("data-id"));
  },

  render: function render() {
    var self = this;
    var data = self.props.dataSet.map(function (obj, i) {
      return React.createElement(
        "li",
        { key: i },
        React.createElement(
          "a",
          { className: "button",
            href: "#",
            "data-id": obj["id"],
            onClick: self.handleClick },
          obj["name"]
        )
      );
    });
    return React.createElement(
      "div",
      null,
      self.props.title,
      React.createElement(
        "ul",
        { style: { listStyleType: "none" } },
        data
      )
    );
  }
});

var data = require("./data");
var api = require("./remote-api");

/**
 * Enter your league ID number like so:
 *   `export L=99999 && node bin/www`
 * @type {{L}}
 */
module.exports = (function ( L ) {
  return {
    L: L,
    nested: {
      franchises: "franchise",
      rosterLimits: "position",
      divisions: "division",
      starters: "position"
    }
  };
})(process.env.L);

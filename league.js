"use strict";

/**
 * Enter your league ID number like so:
 *   `echo L=99999 && node bin/www`
 * @type {{L}}
 */
module.exports = (function ( L ) {
  return {
    L: L
  };
})(process.env.L);

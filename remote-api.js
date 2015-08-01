"use strict";
var basePath = "/2015/export?JSON=1&",
  reg1 = /[{}"]/g,
  reg2 = /\:/g,
  reg3 = /\,/g,
  L = require("./league").L,
  LOBJ = { L: L };
module.exports = {
  L: L,
  host: "football30.myfantasyleague.com",
  headers: {
    'Content-Type': 'application/json'
  },
  path: function ( typeStr, argObj ) {
    var type = this.types[typeStr][0];
    if ( argObj && "function" === typeof type ) {
      type = type(argObj);
    }
    type.TYPE = typeStr;
    var params = JSON.stringify(type).replace(reg1, "").replace(reg2, "=").replace(reg3, "&");
    return basePath + params;
  },
  types: {
    players: [ { DETAILS: 1 }, "player" ],
    injuries: [ function (W) { return (W) ? {W: W} : {}; }, "injury" ],
    nflSchedule: [ function (W) { return (W) ? {W: W} : {}; }, "matchup" ],
    adp: [ { FRANCHISES: 10, IS_MOCK: 0, IS_PPR: 1 }, "player" ],
    topAdds: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    topDrops: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    topStarters: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    topOwns: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    rosters: [ LOBJ, "franchise" ],
    leagueStandings: [ LOBJ, "franchise" ],
    weeklyResults: [ function (W) { return (W) ? {W: W, L: L} : LOBJ; }, "franchise" ],
    liveScoring: [ function (W) { return (W) ? {W: W, L: L, DETAILS: 1} : {L: L, DETAILS: 1}; }, "matchup" ],
    playerScores: [ function (W) { return (W) ? {W: W, L: L} : LOBJ; }, "playerScore" ],
    freeAgents: [ function (obj) { obj = obj || {}; obj.L = L; return obj; }, "player" ],
    projectedScores: [ function (obj) { obj = obj || {}; obj.L = L; return obj; }, "playerScore" ],
    accounting: [ LOBJ, "entry" ],
    calendar: [ LOBJ, "event" ],
    pointsAllowed: [ LOBJ, "team" ],
    whoShouldIStart: [ function (obj) { obj = obj || {}; return obj; }, "startBenchPair" ],
    playoffBrackets: [ LOBJ, "playoffBracket" ]
    //playerProfile: [ function (P) { return (P) ? {P: P} : {}; }, "" ], /** Will require its own module **/
    //playerStatus: [ function (P) { return {P: P, L: L}; }, "" ],
    //league: [ LOBJ, "" ], /** Will require its own module **/
    //transactions: [ function (obj) { obj = obj || {}; obj.L = L; return obj; }, "" ], // Something is wrong with this
    //pendingTrades: [ LOBJ, "" ], /** Too involved for now **/
    //tradeBait: [ LOBJ, "" ], /** Too involved for now **/
  }
};




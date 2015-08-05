var basePath = "/2015/export?JSON=1&",
  reg1 = /[{}"]/g,
  reg2 = /\:/g,
  reg3 = /\,/g,
  L = require("./league").L,
  LOBJ = { L: L };

module.exports = {
  data: {},
  L: L,
  host: "football30.myfantasyleague.com",
  headers: {
    'Content-Type': 'application/json'
  },
  path: function ( typeStr, argObj ) {
    var type = this.types[typeStr][0];
    if ( argObj ) {
      type = type(argObj);
    }
    else {
      type = type();
    }
    type.TYPE = typeStr;
    var params = JSON.stringify(type).replace(reg1, "").replace(reg2, "=").replace(reg3, "&");
    return basePath + params;
  },
  types: {
    players: [ function () { return {} }, "player" ],
    injuries: [ function (W) { return (W) ? {W: W} : {}; }, "injury" ],
    nflSchedule: [ function (W) { return (W) ? {W: W} : {}; }, "matchup" ],
    adp: [ function () { return { FRANCHISES: 10, IS_MOCK: 0, IS_PPR: 1 }; }, "player" ],
    topAdds: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    topDrops: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    topStarters: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    topOwns: [ function (W) { return (W) ? {W: W} : {}; }, "player" ],
    rosters: [ function () { return LOBJ; }, "franchise" ],
    leagueStandings: [ function () { return LOBJ; }, "franchise" ],
    weeklyResults: [ function (W) { return (W) ? {W: W, L: L} : LOBJ; }, "franchise" ],
    liveScoring: [ function (W) { return (W) ? {W: W, L: L, DETAILS: 1} : {L: L, DETAILS: 1}; }, "matchup" ],
    playerScores: [ function (W) { return (W) ? {W: W, L: L} : LOBJ; }, "playerScore" ],
    freeAgents: [ function (obj) { obj = obj || {}; obj.L = L; return obj; }, "player" ],
    projectedScores: [ function (obj) { obj = obj || {}; obj.L = L; return obj; }, "playerScore" ],
    accounting: [ function () { return LOBJ; }, "entry" ],
    calendar: [ function () { return LOBJ; }, "event" ],
    pointsAllowed: [ function () { return LOBJ; }, "team" ],
    whoShouldIStart: [ function (obj) { obj = obj || {}; return obj; }, "startBenchPair" ],
    playoffBrackets: [ function () { return LOBJ; }, "playoffBracket" ]
    //playerProfile: [ function (P) { return (P) ? {P: P} : {}; }, "" ], /** Will require its own module **/
    //playerStatus: [ function (P) { return {P: P, L: L}; }, "" ],
    //league: [ LOBJ, "" ], /** Will require its own module **/
    //transactions: [ function (obj) { obj = obj || {}; obj.L = L; return obj; }, "" ], // Something is wrong with this
    //pendingTrades: [ LOBJ, "" ], /** Too involved for now **/
    //tradeBait: [ LOBJ, "" ], /** Too involved for now **/
  }
};




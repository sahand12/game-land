const gameInstance = {
  players: {
    user0ID: {
      userId: 'serverSideUserID',
      nickname: '',
      avatar: '', // an id of an avatar resource in db | a url
      playerID: '', // '0' | '1' | '2' | '3' | ....
    },
    userID: {
      userId: 'serverSideUserID',
      nickname: '',
      avatar: '',
      playerID: '',
    },
  },
  matchInfo: {
    id: 'gameID', // matchId: `${gameName}:${uuid}`,
    gameName: '',
    firstTurn: 'userID',
  },
  // mySelf: 'player0Id or player1Id',
  isSpectator: 'boolean',
};
const theme = {};

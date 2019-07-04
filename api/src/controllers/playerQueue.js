class PlayersQueue {
  constructor(games = []) {
    this._games = {};
    if (Array.isArray(games) && games.length !== 0) {
      games.forEach(gameName => this.addGame(gameName));
    }
  }

  addGame(gameName) {
    if (this._games[gameName] === undefined) {
      this._games[gameName] = []; // Add game queue here
    }
  }

  removeGameQueue(gameName) {
    if (this.hasGame(gameName)) {
      delete this._games[gameName];
    }
  }

  getAllPlayers(gameName) {
    if (this.hasGame(gameName)) {
      // return a copy
      return [...this._games[gameName]];
    }
    return [];
  }

  getOnePlayer(gameName) {
    const players = this._games[gameName];
    if (players !== undefined && players.length !== 0) {
      const [first, ...rest] = players;
      this._games[gameName] = rest;
      return first;
    }
    return null;
  }

  addPlayer(gameName, userId) {
    if (!this.hasGame(gameName)) {
      this.addGame(gameName);
    }

    this._games[gameName].push({ userId, at: Date.now() });
  }

  removePlayer(gameName, userId) {
    if (this.hasPlayer(gameName, userId)) {
      this._games[gameName] = this._games[gameName].filter(
        obj => obj.userId !== userId
      );
    }
  }

  hasGame(gameName) {
    return (
      this._games[gameName] !== undefined &&
      Array.isArray(this._games[gameName])
    );
  }

  hasPlayer(gameName, userId) {
    return (
      this.hasGame(gameName) &&
      this._games[gameName].some(obj => obj.userId === userId)
    );
  }
}

const playerQueue = new PlayersQueue();
export default playerQueue;
export {PlayersQueue};

class PlayersQueue {
  constructor() {
    this.queue = {};
  }

  addGame(gameName) {
    if (this.queue[gameName] === undefined) {
      this.queue[gameName] = [];
    }
  }

  removeGame(gameName) {
    if (this.queue[gameName]) {
      delete this.queue[gameName];
    }
  }

  getAllPlayers(gameName) {
    if (this.queue[gameName]) {
      return this.queue[gameName];
    }
    return [];
  }

  getOnePlayer(gameName) {
    const players = this.queue[gameName];
    if (players && players.length !== 0) {
      const [first, ...rest] = players;
      this.queue[gameName] = rest;
      return first;
    }
    return null;
  }

  addPlayer(gameName, userId) {
    if (!this.hasGame(gameName)) {
      this.addGame(gameName);
    }

    this.queue[gameName].push({userId, at: Date.now()});
  }

  removePlayer(gameName, userId) {
    if (this.hasPlayer(gameName, userId)) {
      this.queue[gameName] = this.queue[gameName].filter(obj => obj.userId !== userId);
    }
  }

  hasGame(gameName) {
    return this.queue[gameName] !== undefined;
  }

  hasPlayer(gameName, userId) {
    return this.queue[gameName] && this.queue[gameName].includes(userId);
  }
}

const playerQueue = new PlayersQueue();
export default playerQueue;

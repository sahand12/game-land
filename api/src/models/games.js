class Game {
  constructor(storageApi, tableName = 'games') {
    this.db = storageApi;
    this.tableName = tableName;
  }

  async findById(id) {
    return this.db.findById(this.tableName, id);
  }
}

export default Game;

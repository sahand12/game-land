class Match {
  constructor(storageApi, tableName = 'matches') {
    this.db = storageApi;
    this.tableName = tableName;
  }

  async findById(id) {
    return this.db.findById(this.tableName, id);
  }
}

export default Match;

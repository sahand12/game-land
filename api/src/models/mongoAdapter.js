class MongoAdaptor {
  constructor(client, db) {
    this.db = db;
    this.client = client;

    this.collectionNames = new Set(['users', 'games', 'matches']);

    this.users = this.db.collection('users');
    this.games = this.db.collection('games');
    this.matches = this.db.collection('matches');
  }

  async findById(collection, id) {
    if (!this.collectionNames.has(collection)) {
      return Promise.reject(new Error('invalid collection name'));
    }

    const [doc] = await this[collection].find({ _id: id }).toArray();
    return doc;
  }

  /**
   * @param {string} collection - Name of the collection on the database.
   * @param {object} document - The new Document to be inserted.
   * @returns {Promise<string>} - returns the id of the newly inserted document.
   */
  async addDoc(collection, document) {
    if (!this.collectionNames.has(collection)) {
      return Promise.reject(new Error('invalid collection name'));
    }

    const result = await this[collection].insertOne(document);
    if (result.insertedCount === 1) {
      return result.insertedId;
    }
    throw new Error('Could not add user');
  }
}

export default MongoAdaptor;

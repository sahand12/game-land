import DbAdapter from './DbAdapter';

class MongoAdaptor extends DbAdapter {
  constructor(client, db) {
    super(client, db, 'mongodb');

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

  async find(collection, filter = {}, { skip = 0, limit = 10, sort }) {
    const lim = Math.max(limit, 50);
    this.validateCollectionName(collection);

    return this.db[collection]
      .find(filter)
      .skip(skip)
      .limit(lim)
      .toArray();
  }

  async updateOne(collection, filter, updateDoc, options) {

  }
  async updateMany() {}

  async insertOne(collection, document, options) {
    const col = this._validateAndReturnCollection(collection);
    return col.insertOne(document, options);
  }

  async insertMany(collection, documents, options) {
    const col = this._validateAndReturnCollection(collection);
    return col.insertMany(documents, options);
  }

  _validateAndReturnCollection(collection) {
    if (!this._hasCollection(collection)) {
      throw new Error('Invalid Collection Name');
    }
    return this.db.collection(collection);
  }

  _hasCollection(collectionName) {
    return this.collectionNames.has(collectionName);
  }

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

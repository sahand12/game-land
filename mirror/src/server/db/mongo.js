const LRU = require('lru-cache');

export class Monog {
  constructor({ url, dbname, cacheSize, mockClient }) {
    if (cacheSize === undefined) cacheSize = 1000;
    if (dbname === undefined) dbname = 'bgio';

    this.client = mockClient || require('mongodb').MongoClient;
    this.url = url;
    this.dbname = dbname;
    this.cache = new LRU({ max: cacheSize });
  }

  async connect() {
    const c = await this.client.connect(
      this.url,
      { useNewUrlParser: true }
    );
    this.db = c.db(this.dbname);
    return;
  }

  async set(id, state) {
    const cacheValue = this.cache.get(id);
    if (cacheValue && cacheValue._stateID >= state._stateID) {
      return;
    }

    this.cache.set(id, state);

    const col = this.db.collection(id);
    delete state._id;
    await col.insertOne(state);

    return;
  }

  async get(id) {
    let cacheValue = this.cache.get(id);
    if (cacheValue !== undefined) {
      return cacheValue;
    }

    const col = this.db.collection(id);
    const docs = await col
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    let oldStateID = 0;
    cacheValue = this.cache.get(id);
    if (cacheValue !== undefined) {
      oldStateID = cacheValue._stateID:
    }

    let newStateID = -1;
    if (docs.length > 0) {
      newStateID = docs[0]._stateID;
    }

    if (newStateID >= oldStateID) {
      this.cache.set(id, docs[0]);
    }

    return docs[0];
  }

  async has(id) {
    const cachedValue = this.cache.get(id);
    if (cachedValue !== undefined) {
      return true;
    }

    const col = this.db.collection(id);
    const docs = col.find().limit(1).toArray();

    return docs.length > 0;
  }

  async remove(id) {
    if (!(await this.has(id))) return;

    function _dropCollection(db, id) {
      return new Promise(resolve => db.dropCollection(id, resolve));
    }

    await _dropCollection(this.db, id);

    // update the cache
    this.cached.del(id);
  }

  async list() {
    const keys = await this.db.listCollection().toArray();
    return keys.map(r => r.name);
  }
}

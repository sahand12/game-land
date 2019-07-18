// @flow
import { Db, Collection } from 'mongodb';
import { DbError } from './errors';

class UsersMongoRepository {
  collection: Collection;

  constructor(db: Db) {
    this.db = db;
    this.collectionName = 'users';
    this.collection = db.collection(this.collectionName);
  }

  /**
   * Creates a new user and returns the newly created document
   * @returns {Promise<any>}
   */
  async create(userData, opts) {
    const result = await this.collection.insertOne(userData);
    if (result.result.ok === 1 && result.insertedCount === 1) {
      return result.ops[0];
    }
    throw new DbError('something went wrong');
  }

  async getOne(query, opts) {
    return this.collection.findOne(query);
  }

  async getMany(query, opts) {
    return this.collection.find(query);
  }

  async updateOne(filter, updatedUser, opts) {
    return this.collection.updateOne(filter, updatedUser);
  }
}

export default UsersMongoRepository;

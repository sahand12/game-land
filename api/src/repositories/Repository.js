// @flow
import {MongoClient, Db, Collection, InsertOneWriteOpResult} from "mongodb";

interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item:T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

interface IRead<T> {
  find(item:T): Promise<T[]>;
  findOne(id: String): Promise<T>;
}

interface Repository<T> implements IRead<T>, IWrite<T> {}

class MongoRepository<T> implements Repository {
  constructor(db: Db, collectionName: string) {
    this._db = db;
    this._collection = this._db.collection(collectionName);
  }

  async create(item: T): Promise<boolean> {
    const result = await this._collection.insertOne(item);
    return !!result.result.ok;
  }

  async update(id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  async findOne(id: string): Promise<T> {
    throw new Error('Method not implemented');
  }

  async find(item: T): Promise<T[]> {
    throw new Error('Method not implemented');
  }
}

export default MongoRepository;

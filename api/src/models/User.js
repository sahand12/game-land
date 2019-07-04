// @flow
class User {
  constructor(storageApi) {
    this.db = storageApi;
  }

  async findById(id) {
    return this.db.findById('users', id);
  }

  async findAll(filter, { limit, skip, sort }) {
    return this.db.find('users', {}, { limit, skip });
  }
}

export default User;

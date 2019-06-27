class User {
  constructor(storageApi) {
    this.db = storageApi;
  }

  async findById(id) {
    return this.db.findById('users', id);
  }
}

export default User;

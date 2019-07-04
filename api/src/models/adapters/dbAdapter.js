class DbAdapter {
  constructor(client, db, name) {
    this.client = client;
    this.db = db;
    this.adapterName = name;
  }

  getAdapterName() {
    return this.adapterName;
  }
}

export default DbAdapter;

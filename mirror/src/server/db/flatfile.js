export class FlatFile {
  constructor({dir, logging, ttl}) {
    this.games = require('node-persist');
    this.dir = dir;
    this.logging = logging || false;
    this.ttl = ttl || false;
  }

  async connect() {
    await this.games.init({
      dir: this.dir,
      logging: this.logging,
      ttl: this.ttl,
    });

    return;
  }

  async clear() {
    return this.games.clear();
  }

  async set(id, state) {
    return this.games.setItem(id, state);
  }

  async get(id) {
    return this.games.getItem(id);
  }

  async has(id) {
    const keys = await this.games.keys();
    return keys.includes(id);
  }

  async remove(id) {
    const keys = await this.games.keys();
    if (!keys.includes(id)) return;
    this.games.removeItem(id);
  }

  async list() {
    return [...(await this.games.keys())];
  }
}

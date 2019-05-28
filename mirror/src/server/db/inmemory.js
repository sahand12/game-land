/**
 * InMemory data storage.
 */
export class InMemory {
  /**
   * Creates a new InMemory storage.
   */
  constructor() {
    this.games = new Map();
  }

  /**
   * Connect.
   * No-op for the InMemory instance.
   */
  connect() {}

  /**
   * Write the game state to the in-memory object.
   *
   * @param {string} id - The game id.
   * @param {object} state - A game state to persist
   */
  set(id, state) {
    return this.games.set(id, state);
  }

  get(id) {
    return this.games.get(id);
  }

  has(id) {
    return this.games.has(id);
  }

  remove(id) {
    if (!this.games.has(id)) return;
    this.games.delete(id);
  }

  list() {
    return [...this.games.keys()];
  }
}

const PlayerView = {
  /**
   * STRIP_SECRETS
   *
   * Reducer which removes a key named `secret` and removes all
   * the keys in the `players`, except for the one corresponding
   * to the current playerID.
   */
  STRIP_SECRETS(G, ctx, playerID) {
    const r = { ...G };

    if (r.secret !== undefined) {
      delete r.secret;
    }

    if (r.players) {
      r.players = {
        [playerID]: r.players[playerID],
      };
    }

    return r;
  },
};

export { PlayerView };

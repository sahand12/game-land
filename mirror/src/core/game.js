import { FnWrap } from '../plugins/main';
import { FlowWithPhases } from './flow';

/**
 * Helper to generate the game move reducer. (Game move reducer generator).
 * The returned reducer has the following signature.
 *
 * (G, action, ctx) => {}
 *
 *
 */
function Game(game) {
  if (game.name === undefined) game.name = 'default';
  if (game.setup === undefined) game.setup = () => ({});
  if (game.moves === undefined) game.moves = {};
  if (game.playerView === undefined) game.playerView = (G, ctx, playerID) => G;
  if (game.plugins === undefined) game.plugins = [];

  if (!game.flow || game.flow.processGameEvent === undefined) {
    game.flow = FlowWithPhases({ game, ...game.flow });
  }

  return {
    ...game,
    moveNames: Object.getOwnPropertyNames(game.moves),
    processMove: function processMove(G, action, ctx) {
      if (game.moves.hasOwnProperty(action.type)) {
        const ctxWithPlayerID = { ...ctx, playerID: action.playerID };
        const args = [G, ctxWithPlayerID, ...action.args];
        const fn = FnWrap(game.moves[action.type], game);

        // Mutates the G, so the game progresses
        return fn(...args);
      }
      return G;
    },
  };
}

export default Game;

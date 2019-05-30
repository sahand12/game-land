import { automaticeGameEvent } from './action-creators';

class Events {
  constructor(flow, playerID) {
    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
  }

  /**
   * Attaches the Events API to ctx.
   *
   * @param {object} ctx - The ctx object to attach to.
   */
  attach(ctx) {
    /**
    events = {
      'endTurn': (...args) => this.dispatch.push({key: 'endTurn', args}),
      'endPhase': (...args) => this.dispatch.push({key: 'endPhase', args}),
      'endGame': (...args) => this.dispatch.push({key: 'endGame', args}),
    }
     */
    const events = {};

    for (const key of this.flow.eventNames) {
      events[key] = (...args) => {
        this.dispatch.push({ key, args });
      };
    }

    return { ...ctx, events };
  }

  /**
   * Updates ctx with the triggered events.
   *
   * @param {object} state - The state object {G, ctx}.
   */
  update(state) {
    for (const item of this.dispatch) {
      // Build appropriate action with actionCreators
      const action = automaticeGameEvent(item.key, item.args, this.playerID);
      state = {
        ...state,
        ...this.flow.processGameEvent(state, action),
      };
    }

    return state;
  }
}

/**
 * Detaches the Events API from ctx.
 * @param {object} ctx - The ctx object to strip
 */
Events.detach = function detachEvents(ctx) {
  const { events, ...rest } = ctx;
  return rest;
};

export { Events };

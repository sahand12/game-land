const victoryPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// @TODO: Reformat this so we have a game status field which can be 'win', 'draw' or 'running'.
/**
 *
 * @param [Array] cells
 * @returns {object} - If one of the victory positions is achieved it will return a tuple of {winner: true, position} else will return {winner: false}.
 */
const isVictory = cells => {
  for (const pos of victoryPositions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (const i of pos) {
      if (cells[i] !== symbol) {
        winner = null;
        break;
      }
    }
    if (winner !== null) {
      return { winner: true, position: pos };
    }
  }
  return { winner: false };
};

const isDraw = cells =>
  !isVictory(cells) && cells.filter(c => c === null).length === 0;

export { isVictory, isDraw };

// @flow
import type { UXOCells, UXOWinPosition, UXOGameStatusAfterMove } from './types';

const victoryPositions: Array<UXOWinPosition> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkGameStatusAfterMove(cells: UXOCells): UXOGameStatusAfterMove {
  const res = isVictory(cells);
  if (res.winner === true) {
    return {
      status: 'WIN',
      winPosition: res.position,
    };
  }

  if (isDraw(cells)) {
    return {
      status: 'DRAW',
    };
  }

  return {
    status: 'CONTINUE',
  };
}
function isVictory(
  cells: UXOCells
): { winner: boolean, position: ?UXOWinPosition } {
  for (let i = 0; i < victoryPositions.length; i += 1) {
    const pos = victoryPositions[i];
    const symbol = cells[pos[0]];
    let winner = symbol;

    for (let j = 0; j < pos.length; j += 1) {
      const index = pos[j];
      if (cells[index] !== symbol) {
        winner = null;
        break;
      }
    }
    if (winner !== null) {
      return { winner: true, position: pos };
    }
  }
  return { winner: false, position: undefined };
}
function isDraw(cells: UXOCells): boolean {
  return !isVictory(cells) && cells.filter(c => c === null).length === 0;
}

export { isVictory, isDraw, checkGameStatusAfterMove };

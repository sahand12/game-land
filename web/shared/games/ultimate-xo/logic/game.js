// @flow
import { Game } from 'boardgame.io/core';
import { isDraw, isVictory } from '../helpers';

type GameResult = {
  status: 'WIN' | 'DRAW',
  position?: Array<number>,
  winner?: string,
  draw?: boolean,
};
type MiniBoard = {
  id: number,
  cells: Array<string | null>,
  winner: null | string,
};

const createMiniBoard = (_, index): MiniBoard => ({
  id: index,
  cells: new Array(9).fill(null),
  winner: null,
});
const createInitialMiniBoards = () => new Array(9).fill(null).map(createMiniBoard);
const createInitialActiveMiniBoardIds = () => new Array(9).fill(null).map((_, index) => index);

type UXOG = {
  boards: Array<MiniBoard>,
  activeBoardIds: Array<number>,
}

const UltimateTicTacToeGame = Game({
  name: 'ultimate-tic-tac-toe',

  setup: (): UXOG => ({
    boards: createInitialMiniBoards(),
    activeBoardIds: createInitialActiveMiniBoardIds(),
  }),

  moves: {
    clickCell(G, ctx, boardId: number, cellId: number) {
      const clickedBoard = G.boards.find(b => b.id === boardId);
      const clickedCell = clickedBoard.cells[cellId];
      const isBoardActive: boolean = G.activeBoardIds.filter(id => id === boardId).length === 1;

      // 1. The board is active (can be clicked).
      // 2. The clicked board has no winner yet.
      // 3 & 4. The cellId is valid.
      // 3. The clicked cell is empty.
      const isValidMove =
        isBoardActive &&
        clickedBoard.winner === null &&
        cellId >= 0 &&
        cellId < clickedBoard.cells.length &&
        clickedCell === null;

      if (isValidMove) {
        /*
         * 1. Update the clicked cell in the clicked board cells array.
         * 2. Check if we have a winner in the clicked board and if we
         *    do update the board winner prop.
         * 3. Update G.boards to reflect changes
         * 4. find the next active board:
         *   4.1. if the next active board does not have a winner
         *       `G.activeBoardIds` will only include its id
         *   4.2. if the next active board has a winner already populate
         *        G.activeBoardIds by finding all the boards which
         *        `board.winner === null`.
         * 5. End the turn
         * 6. No need to return the new G because of the immer plugin.
         */

        // 1.
        clickedBoard.cells[cellId] = ctx.currentPlayer;

        // 2.
        const { winner } = isVictory(clickedBoard.cells);
        if (winner) {
          clickedBoard.winner = ctx.currentPlayer;
        }

        // 3.
        // eslint-disable-next-line no-param-reassign
        G.boards[boardId] = clickedBoard;

        // 4.
        const nextActiveBoard = G.boards[cellId];

        // 4.1
        if (nextActiveBoard.winner === null) {
          // eslint-disable-next-line no-param-reassign
          G.activeBoardIds = [cellId];
        }
        // 4.2
        else {
          // eslint-disable-next-line no-param-reassign
          G.activeBoardIds = G.boards.filter(b => b.winner === null).map(b => b.id);
        }

        // 5.
        ctx.events.endTurn();

        // 6.
      } else {
        // The move is not valid so no need to return G because of the
        // immer plugin again.
      }
    },
  },

  flow: {
    // Only if this function returns 'undefined' game will continue.
    // any other value will terminate the game.
    endGameIf(G, ctx): void | GameResult {
      const boardWinners = G.boards.map(b => b.winner);
      const { winner, position } = isVictory(boardWinners);

      if (winner) {
        return { status: 'WIN', winner: ctx.currentPlayer, position };
      }

      // @TODO: if there is no way to win for any player also finish the game.
      if (isDraw(boardWinners)) {
        return { status: 'DRAW', draw: true };
      }

      // Continue the game
      return undefined;
    },
  },
});

export default UltimateTicTacToeGame;
export type { MiniBoard, UXOG };

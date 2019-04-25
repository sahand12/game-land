// @flow
import React from 'react';
import TicTacToeBoard from './TicTacToeBoard';
import type {UXOG} from "../logic/game";

type Props = {
  G: UXOG,
  ctx: {},
  moves: { [name: string]: Function },
  playerID: string, // eslint-disable-line react/no-unused-prop-types
  isActive: boolean,
  isMultiplayer: boolean, // eslint-disable-line react/no-unused-prop-types
  isConnected: boolean, // eslint-disable-line react/no-unused-prop-types
  isPreview: boolean, // eslint-disable-line react/no-unused-prop-types
};

function renderBoards(G, moves: { [string]: Function }, isActive: boolean) {
  const { boards, activeBoardIds } = G;

  /**
   * isActive prop is true && The clicked board has no winner yet && The clicked cell is emptyp
   * @returns {boolean}
   */
  function isMoveValid(boardId: number, cellId: number) {
    return isActive && boards[boardId].winner === null && boards[boardId].cells[cellId] === null;
  }

  function onClick(boardId: number, cellId: number) {
    if (isMoveValid(boardId, cellId)) {
      moves.clickCell(boardId, cellId);
    }
  }

  const tbody = [];
  for (let i = 0; i < 3; i += 1) {
    const cells = [];
    for (let j = 0; j < 3; j += 1) {
      const boardId = 3 * i + j;
      cells.push(
        <td key={boardId}>
          <TicTacToeBoard
            board={boards[boardId]}
            active={activeBoardIds.includes(boardId)}
            onCellClick={onClick}
          />
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return tbody;
}
const UltimateTicTacToeBoard = ({ G, moves, isActive }: Props) => (
  <div>
    <table>
      <tbody>{renderBoards(G, moves, isActive)}</tbody>
    </table>
  </div>
);

export default UltimateTicTacToeBoard;

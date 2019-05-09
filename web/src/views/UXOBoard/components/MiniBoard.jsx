// @flow
import React from 'react';
import type { MiniBoardState } from '../../../../shared/games/ultimate-xo/game';
import MiniBoardCell from './MiniBoardCell';

type Props = {
  active: boolean,
  board: MiniBoardState,
  onCellClick: (boardId: number, cellId: number) => void,
};
const MiniBoard = ({ active, board, onCellClick }: Props) => {
  const cells = [];
  if (board.winner === null) {
    for (let i = 0; i < 9; i += 1) {
      cells.push(
        <MiniBoardCell
          key={i}
          boardId={board.id}
          cellId={i}
          onCellClick={onCellClick}
          value={board.cells[i]}
        />
      );
    }
  }
  return <div className={`ux-board__miniBoard ${active ? 'active' : ''}`}>{cells}</div>;
};

export default MiniBoard;

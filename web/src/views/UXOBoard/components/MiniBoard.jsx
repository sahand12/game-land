// @flow
import React from 'react';
import type { MiniBoardState } from '../../../../shared/games/ultimate-xo/game';
import MiniBoardCell from './MiniBoardCell';

type Props = {
  isMyTurn: boolean,
  isPlayable: boolean,
  board: MiniBoardState,
  onCellClick: (boardId: number, cellId: number) => void,
};
const MiniBoard = ({ isMyTurn, isPlayable, board, onCellClick }: Props) => {
  const cells = [];
  const canBePlayedByMe = isMyTurn && isPlayable;
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
  return (
    <div
      className={`gl-uxo__board__miniboard ${canBePlayedByMe ? 'active' : ''}`}
    >
      {cells}
    </div>
  );
};

export default MiniBoard;

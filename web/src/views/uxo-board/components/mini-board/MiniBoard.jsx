// @flow
import React from 'react';
import type { MiniBoardState } from '../../../../../shared/games/ultimate-xo/types';
import MiniBoardCell from '../cell/MiniBoardCell';
import PlayerSymbol from '../PlayerSymbol';

type Props = {
  isMyTurn: boolean,
  isPlayable: boolean,
  hasWinner: boolean,
  board: MiniBoardState,
  onCellClick: (boardId: number, cellId: number) => void,
};
const MiniBoard = ({
  isMyTurn,
  isPlayable,
  hasWinner,
  board,
  onCellClick,
}: Props) => {
  let cells = [];
  const canBePlayedByMe = isMyTurn && isPlayable && !hasWinner;
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
  } else {
    cells = <MiniBoardWithWinner winner={board.winner} />;
  }
  return (
    <div
      className={`
        gl-uxo__board__miniboard
        ${hasWinner ? 'has-winner' : ''}
        ${canBePlayedByMe ? 'active' : ''}
      `}
    >
      {cells}
    </div>
  );
};

const MiniBoardWithWinner = ({ winner }: { winner: string }) => (
  <div className="gl-uxo__board__winner">
    <PlayerSymbol player={winner} />
  </div>
);

export default MiniBoard;

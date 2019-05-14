// @flow
import React from 'react';
import MiniBoard from './MiniBoard';
import './style.scss';

type Props = {
  G: Object,
  moves: { [string]: Function },
  isActive: boolean,
};

const UXOBoard = ({ G, moves, isActive }: Props) => (
  <div className="gl-uxo__board">
    {renderMiniBoards({ G, moves, isActive })}
  </div>
);

const UltimateXOPage = ({ G, moves, isActive }: Props) => {
  return (
    <div className="gl-uxo__page">
      <div className="gl-uxo__boardContainer">
        <UXOBoard G={G} moves={moves} isActive={isActive} />
      </div>
    </div>
  );
};

function renderMiniBoards({ G, moves, isActive }: Props) {
  const { boards, activeBoardIds } = G;
  const miniBoards = [];

  for (let i = 0; i < 9; i += 1) {
    miniBoards.push(
      <MiniBoard
        key={i}
        board={boards[i]}
        isMyTurn={isActive} // I can make a move
        isPlayable={activeBoardIds.includes(i)} // This mini board can be played by me or by the other player does not matter
        onCellClick={onClick}
      />
    );
  }
  return miniBoards;

  // 1. It's our turn (we are allowed to make a move)
  // 2. The mini board can be played.
  // 2. The mini board in which we are making a move does not have a winner yet.
  // 3. The cell in which we are clicking has not been clicked yet.
  function isMoveValid(boardId: number, cellId: number) {
    return (
      isActive &&
      activeBoardIds.includes(boardId) &&
      boards[boardId].winner === null &&
      boards[boardId].cells[cellId] === null
    );
  }

  function onClick(boardId: number, cellId: number) {
    if (isMoveValid(boardId, cellId)) {
      moves.clickCell(boardId, cellId);
    }
  }
}

export default UltimateXOPage;

// @flow
import React from 'react';
import MiniBoard from './MiniBoard';
import './style.scss';

type Props = {
  G: Object,
  // ctx: Object,
  moves: { [name: string]: Function },
  playerID: string, // eslint-disable-line react/no-unused-prop-types
  isActive: boolean,
  isMultiplayer: boolean, // eslint-disable-line react/no-unused-prop-types
  isConnected: boolean, // eslint-disable-line react/no-unused-prop-types
  isPreview: boolean, // eslint-disable-line react/no-unused-prop-types
};

function renderMiniBoards(G, moves: { [string]: Function }, isActive: boolean) {
  const { boards, activeBoardIds } = G;

  function isMoveValid(boardId: number, cellId: number) {
    return (
      isActive &&
      boards[boardId].winner === null &&
      boards[boardId].cells[cellId] === null
    );
  }

  function onClick(boardId: number, cellId: number) {
    if (isMoveValid(boardId, cellId)) {
      moves.clickCell(boardId, cellId);
    }
  }

  const miniBoards = [];
  for (let i = 0; i < 9; i += 1) {
    miniBoards.push(
      <MiniBoard
        key={i}
        board={boards[i]}
        active={isActive && activeBoardIds.includes(i)}
        onCellClick={onClick}
      />
    );
  }

  return miniBoards;
}
const UltimateTicTacToeBoard = ({ G, moves, isActive }: Props) => {
  return (
    <div
      className="gl-uxo-board"
      style={{ margin: '0 100px auto', marginBottom: '100px', marginTop: 50 }}
    >
      {renderMiniBoards(G, moves, isActive)}
    </div>
  );
};

export default UltimateTicTacToeBoard;

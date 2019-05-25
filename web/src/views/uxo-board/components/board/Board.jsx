// @flow
import React from 'react';

import { PlayerIDContext } from '../../contexts/index';
import MiniBoard from '../mini-board/MiniBoard';
import TopStatusBar from '../top-status-bar/index';
import '../style-dots.scss';

type Props = {
  G: Object,
  moves: { [string]: Function },
  isActive: boolean,
  playerID: string,
};

function UXOBoard({ G, moves, isActive, playerID }: Props) {
  return (
    <PlayerIDContext.Provider value={playerID}>
      <div
        className={`gl-uxo__board ${
          playerID === '0'
            ? 'gl-uxo--is-first-player'
            : 'gl-uxo--is-second-player'
        }`}
      >
        {renderMiniBoards({ G, moves, isActive, playerID })}
      </div>
    </PlayerIDContext.Provider>
  );
}
function UXOPage(props: Props) {
  const { G, moves, isActive, playerID } = props;

  return (
    <div className="gl-uxo__page">
      <TopStatusBar />
      <div className="gl-uxo__boardContainer">
        <UXOBoard G={G} moves={moves} isActive={isActive} playerID={playerID} />
      </div>
    </div>
  );
}
function renderMiniBoards({ G, moves, isActive, playerID }: Props) {
  const { boards, activeBoardIds } = G;
  const miniBoards = [];

  for (let i = 0; i < 9; i += 1) {
    miniBoards.push(
      <MiniBoard
        key={i}
        playerID={playerID}
        board={boards[i]}
        hasWinner={boards[i].winner !== null}
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

export default UXOPage;

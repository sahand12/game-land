import React from 'react';
import PropTypes from 'prop-types';
import TicTacToeBoard from './TicTacToeBoard';

const UltimateTicTacToeBoard = props => {
  const { G, moves, isActive } = props;
  return (
    <div>
      <table>
        <tbody>{renderBoards(G, moves, isActive)}</tbody>
      </table>
    </div>
  );
};

function renderBoards(G, moves, isActive) {
  const { boards, activeBoardIds } = G;
  const tbody = [];
  for (let i = 0; i < 3; i++) {
    const cells = [];
    for (let j = 0; j < 3; j++) {
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

  function onClick(boardId, cellId) {
    if (isMoveValid(boardId, cellId)) {
      moves.clickCell(boardId, cellId);
    }
  }
  function isMoveValid(boardId, cellId) {
    const { winner, cells } = boards[boardId];

    // isActive prop is true && The clicked board does not
    // have a winner && The clicked cell is empty
    return isActive && winner === null && cells[cellId] === null;
  }
}

UltimateTicTacToeBoard.propTypes = {
  G: PropTypes.any.isRequired,
  ctx: PropTypes.any.isRequired,
  moves: PropTypes.any.isRequired,
  playerID: PropTypes.string,
  isActive: PropTypes.bool,
  isMultiplayer: PropTypes.bool,
  isConnected: PropTypes.bool,
  isPreview: PropTypes.bool
};

export default UltimateTicTacToeBoard;

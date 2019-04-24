import React from 'react';

const TicTacToeBoard = ({ active, board, onCellClick }) => (
  <div className={`${active ? 'active' : ''}`}>
    <table>
      <tbody>
        {new Array(3).fill(null).map((value, index) => (
          <Row
            key={index}
            row={index}
            cols={3}
            onCellClick={onCellClick}
            cells={board.cells}
            boardId={board.id}
          />
        ))}
      </tbody>
    </table>
  </div>
);

const Row = ({ boardId, row, cols, cells, onCellClick }) => (
  <tr>
    {new Array(cols).fill(null).map((value, index) => (
      <Cell
        key={index}
        cellId={row * cols + index}
        value={cells[row * cols + index]}
        onCellClick={onCellClick}
        boardId={boardId}
      />
    ))}
  </tr>
);

const Cell = ({ boardId, cellId, onCellClick, value }) => (
  <td onClick={() => onCellClick(boardId, cellId)}>{value}</td>
);

export default TicTacToeBoard;

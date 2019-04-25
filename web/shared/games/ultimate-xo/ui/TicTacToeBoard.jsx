// @flow
import React from 'react';
import type { MiniBoard } from '../logic/game';

type TicTacToeBoardProps = {
  active: boolean,
  board: MiniBoard,
  onCellClick: (boardId: number, cellId: number) => void,
};
const TicTacToeBoard = ({ active, board, onCellClick }: TicTacToeBoardProps) => (
  <div className={`${active ? 'active' : ''}`}>
    <table>
      <tbody>
        {new Array(3).fill(null).map((value, index) => (
          <Row
            key={index} // eslint-disable-line react/no-array-index-key
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

type MiniBoardRowProps = {
  boardId: number,
  row: number,
  cols: number,
  cells: Array<null | string>,
  onCellClick: (boardId: number, cellId: number) => void,
};
const Row = ({ boardId, row, cols, cells, onCellClick }: MiniBoardRowProps) => (
  <tr>
    {new Array(cols).fill(null).map((value, index) => (
      <Cell
        key={index} // eslint-disable-line react/no-array-index-key
        cellId={row * cols + index}
        value={cells[row * cols + index]}
        onCellClick={onCellClick}
        boardId={boardId}
      />
    ))}
  </tr>
);

type MiniBoardCellProps = {
  boardId: number,
  cellId: number,
  onCellClick: (boardId: number, cellId: number) => void,
  value: null | string,
};
const Cell = ({ boardId, cellId, onCellClick, value }: MiniBoardCellProps) => (
  <td onClick={() => onCellClick(boardId, cellId)}>{value}</td> // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
);

export default TicTacToeBoard;

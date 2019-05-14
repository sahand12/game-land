// @flow
import * as React from 'react';
import PlayerSymbol from './PlayerSymbol';

type Props = {
  boardId: number,
  cellId: number,
  onCellClick: (boardId: number, cellId: number) => void,
  value: null | string,
};

const MiniBoardCell = ({ boardId, cellId, onCellClick, value }: Props) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  <div
    className="gl-uxo__board__cell"
    onClick={() => onCellClick(boardId, cellId)}
  >
    <PlayerSymbol player={value} />
  </div>
);

export default MiniBoardCell;

// @flow

import PlayerSymbol from "../../../src/views/UXOBoard/components/PlayerSymbol";

type UXOPlayerSymbol = '0' | '1';

type UXOCell = UXOPlayerSymbol | null;
type UXOCells = Array<UXOCell>;

type UXOWinPosition = [number, number, number];

type UXOMiniBoardState = {
  id: number,
  cells: [
    UXOCell,
    UXOCell,
    UXOCell,
    UXOCell,
    UXOCell,
    UXOCell,
    UXOCell,
    UXOCell,
    UXOCell,
  ],
  winner: UXOPlayerSymbol | null,
};
type UXOGameState = {
  boards: [
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
    UXOMiniBoardState,
  ],
  // Which mini boards can be played in this round
  activeBoardIds: Array<number>,
};

type UXOGameStatusAfterMove = {
  status: 'WIN' | 'DRAW' | 'CONTINUE',
  winner?: PlayerSymbol,
  winPosition?: UXOWinPosition,
};

export {
  UXOPlayerSymbol,
  UXOCell,
  UXOCells,
  UXOWinPosition,
  UXOMiniBoardState,
  UXOGameState,
  UXOGameStatusAfterMove,
};

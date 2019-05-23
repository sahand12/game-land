// @flow
import { isVictory, isDraw } from './helpers';
import { xoData } from './test-data';

describe('Ultimate XO: Victory and Draw Calculation', () => {
  describe('mini boards', () => {
    test('Recognize victory correctly', () => {
      xoData.victoryBoards.forEach(miniBoard => {
        expect(isVictory(miniBoard.cells)).toEqual({
          winner: true,
          position: miniBoard.position,
        });
      });
    });

    test('Recognize draw correctly', () => {
      xoData.drawBoards.forEach(miniBoard => {
        expect(isDraw(miniBoard.cells)).toBe(false);
      });
    });
  });

  describe('main board', () => {});
});

// @flow
import { isVictory } from './helpers';
import { xoData } from './data.test';

describe('Ultimate XO: Victory and Draw Calculation', () => {
  describe('mini boards', () => {
    test('calculate the mini board result correctly', () => {
      xoData.victoryBoards.forEach(miniBoard => {
        expect(isVictory(miniBoard.cells)).toEqual({
          winner: true,
          position: miniBoard.position,
        });
      });
    });
  });

  describe('main board', () => {});
});

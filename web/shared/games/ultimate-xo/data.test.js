const xoData = {
  victoryBoards: [
    {
      // prettier-ignore
      cells: [
        '0', '0', '0',
        '1', '1', '0',
        '1', '1', null
      ],
      winner: '0',
      position: [0, 1, 2],
    },
    {
      // prettier-ignore
      cells: [
        '0', null, '0',
        '1', '0', null,
        '1', '1', '0',
      ],
      winner: '0',
      position: [0, 4, 8],
    },
    {
      // prettier-ignore
      cells: [
        '0', null, '0',
        '1', '1', '1',
        null, '1', '0'
      ],
      winner: '1',
      position: [3, 4, 5],
    },
    {
      // prettier-ignore
      cells: [
        '0', '0', '1',
        '1', '0', '0',
        '1', '1', '1',
      ],
      winner: '1',
      position: [6, 7, 8],
    },
    {
      // prettier-ignore
      cells: [
        '0', '0', '1',
        '0', '1', '1',
        '0', '1', null
      ],
      winner: '0',
      position: [0, 3, 6],
    },
    {
      // prettier-ignore
      cells: [
        '0', '1', '0',
        null, '1', null,
        '0', '1', null
      ],
      winner: '1',
      position: [1, 4, 7],
    },
    {
      // prettier-ignore
      cells: [
        null, null, '0',
        '1', '1', '0',
        null, '1', '0'
      ],
      winner: '0',
      position: [2, 5, 8],
    },
    {
      // prettier-ignore
      cells: [
        '1', '0', '0',
        '1', '1', '0',
        '0', '1', '1',
      ],
      winner: '1',
      position: [0, 4, 8],
    },
    {
      // prettier-ignore
      cells: [
        '0', null, '0',
        '1', '0', '1',
        '0', '1', '1'
      ],
      winner: '0',
      position: [2, 4, 6],
    },
  ],
  drawBoards: [],
  undeterminedBoards: [],
};

const uxoData = {};

export { xoData, uxoData };

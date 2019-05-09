// @flow
import * as React from 'react';
import { css } from 'emotion';

const klass = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// type PlayerInfo = {
//   avatar?: string,
//   nickname: string,
//   symbol: string,
//   id: string,
// };
type Props = {
  currentPlayerId: string,
  // players: [PlayerInfo, PlayerInfo],
};
const BoardStats = ({ currentPlayerId }: Props) => {
  // const [playerOne, playerTwo] = players;
  return (
    <div className={klass}>
      <div />
      <div>{currentPlayerId}</div>
      <div />
    </div>
  );
};

export default BoardStats;

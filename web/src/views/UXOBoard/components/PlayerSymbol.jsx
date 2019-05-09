// @flow
import * as React from 'react';
import { IconO, IconX } from './Icon';

type Props = { player: string | null };

const PlayerSymbol = ({ player }: Props) => {
  if (player === null) {
    return null;
  }
  const Icon = player === '0' ? <IconX color="white" /> : <IconO color="yellow" />;
  return (
    <span
      className="tw-flex tw-justify-center "
      style={{
        backgroundColor: 'rgb(41, 207, 122)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}
    >
      <span style={{ width: 16, height: 16 }}>{Icon}</span>
    </span>
  );
};

export default PlayerSymbol;

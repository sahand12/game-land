// @flow
import * as React from 'react';
import { IconO, IconX } from './Icon';

type Props = { player: string | null };

const PlayerSymbol = ({ player }: Props) => {
  if (player === null) {
    return null;
  }
  // @TODO: This should not be here
  const Icon = player === '0' ? <IconX /> : <IconO />;
  return <span className="gl-uxo__board__playerSymbol">{Icon}</span>;
};

export default PlayerSymbol;

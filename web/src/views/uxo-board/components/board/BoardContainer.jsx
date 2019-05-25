// @flow
import * as React from 'react';
import {
  GContext,
  CtxContext,
  IsConnectedContext,
  IsActiveContext,
} from '../../contexts/index';

type Props = {
  G: Object,
  ctx: Object,
  isActive: boolean,
  isConnected: boolean,
  children: React.Node,
};

const BoardContainer = ({ G, ctx, isConnected, isActive, children }: Props) => {
  return (
    <GContext.Provider value={G}>
      <CtxContext.Provider value={ctx}>
        <IsConnectedContext.Provider value={isConnected}>
          <IsActiveContext value={isActive}>{children}</IsActiveContext>
        </IsConnectedContext.Provider>
      </CtxContext.Provider>
    </GContext.Provider>
  );
};

export default BoardContainer;

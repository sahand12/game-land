// @flow
import React, { useState } from 'react';
// import cs from 'classnames';
import IndicatorIcon from '../../../../../assets/icons/indicator.svg';
import AlienIcon from '../../../../../assets/icons/miniman/alien.svg';
import ChefIcon from '../../../../../assets/icons/miniman/chef.svg';
import './style.scss';
import PlayerSymbol from '../PlayerSymbol';

const contents = {
  player0name: 'بارسلونا',
  player1name: 'رئال مادرید',
  indicatorText: 'نوبت',
  // vsText: 'در برابر',
  vsText: 'vs',
};

// type PlayerInfo = {
//   nickname: string,
//   uxoSymbolId: string,
//   avatar: string,
//   stats: {
//     win: number,
//     loss: number,
//   },
// };
// type Props = {
// firstPlayer: PlayerInfo,
// secondPlayer: PlayerInfo,
// };

// eslint-disable-next-line no-unused-vars
function TopStatusBar() {
  return (
    <div className="gl-uxo__topStatusBar">
      <div className="turn-indicator" style={{ height: 65 }} />
      <div className="current-game-status columns" style={{ height: 80 }}>
        <div
          className="player-0 column"
          style={{
            backgroundColor: 'white',
          }}
        />
        <div
          className="game-info column"
          style={{
            height: 65,
            alignSelf: 'flex-end',
            backgroundColor: 'orange',
          }}
        />
        <div className="player-1 column" style={{ backgroundColor: 'white' }} />
      </div>
    </div>
  );
}
function Test() {
  const [moved] = useState(false);
  return (
    <div className="test-wrapper">
      <div className="root">
        <div className={`indicator ${moved ? 'moved' : ''}`}>
          <p className="indicator-text">نوبت</p>
          <p className="indicator-icon">
            <IndicatorIcon />
          </p>
        </div>
        <div className="info">
          <div className="left">
            <AlienIcon width="65px" height="65px" />
          </div>
          <div className="center">
            <div className="player-info">
              <div className="nickname">{contents.player0name}</div>
              <div className="symbol">
                <PlayerSymbol player="0" />
              </div>
            </div>
            <div className="vs-info">{contents.vsText}</div>
            <div className="player-info">
              <div className="nickname">{contents.player1name}</div>
              <div className="symbol">
                <PlayerSymbol player="1" />
              </div>
            </div>
          </div>
          <div className="right">
            <ChefIcon width="65px" height="65px" />
          </div>
        </div>
      </div>
    </div>
  );
}

// function playerNameWithSymbol({name, playerId, playerColor, ...rest}: {name: string, playerId: string, playerColor: string}) {
//   return <div {...rest}>
//     <div>{name}</div>
//     <div><PlayerSymbol player={playerId}/></div>
//   </div>
// }

export default Test;

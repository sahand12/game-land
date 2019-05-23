// @flow
import * as React from 'react';
import './style.scss';

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

function TopStatusBar() {
  //  console.log(props);
  return (
    <div className="gl-uxo__topStatusBar">
      <div className="gl-s-top" />
      <div className="gl-s-bottom">
        <div className="gl-uxo__topStatusBar__left" />
        <div className="gl-uxo__topStatusBar__center" />
        <div className="gl-uxo__topStatusBar__right" />
      </div>
    </div>
  );
}

export default TopStatusBar;

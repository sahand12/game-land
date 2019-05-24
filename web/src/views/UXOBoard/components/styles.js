
import React from 'react';

const defaultTheme = {
  cellColor: '#ffffff',
  pageColor: '#363D5B',
  xColor: '#CD7567',
  oColor: '#43A9A7',
};

const gameData = {
  mySelf: {
    id: '',
    nickname: '',
    avatarName: '',
  },
  opponent: {
    name: '',
    avatarName: '',
  }
};

type Props = {};
type State = {
  theme: Object,
}

class GameContainer extends React.Component {
  render() {
    return <div className="game-container"></div>
  }
}

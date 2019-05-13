// @flow
import * as React from 'react';
import './index.scss';

const PreBoard = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="board">
          <div className="miniboard">
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
            <div className="cell" />
          </div>
          <div className="miniboard" />
          <div className="miniboard" />
          <div className="miniboard" />
          <div className="miniboard" />
          <div className="miniboard" />
          <div className="miniboard" />
          <div className="miniboard" />
          <div className="miniboard" />
        </div>
      </div>
    </div>
  );
};
// const PreMiniBoard = ({cells}) => <div className="miniBoard">{
//
// }</div>;
// const PreCell = () => <div className="cell"></div>;

export default PreBoard;

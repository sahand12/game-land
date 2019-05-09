// @flow
import * as React from 'react';
import defaultTheme from './theme';

const ThemeContext = React.createContext<Object>(defaultTheme);
const BoardContext = React.createContext<Object>();

export { ThemeContext, BoardContext };

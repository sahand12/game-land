// @flow
import {createContext} from 'react';
import defaultTheme from './default';
import happyTheme from './happy';

const ThemeContext = createContext(defaultTheme);

export default ThemeContext;
export {defaultTheme, happyTheme};

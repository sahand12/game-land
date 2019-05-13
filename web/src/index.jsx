import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import AppBoard from './App';
// import AppPlayground from './Playground';
import './css/tailwind.css';

const Dummy = () => <div>this is a test</div>;

render(
  <Router>
    <Dummy path="playground" />
    <AppBoard path="/" />
  </Router>,
  document.getElementById('root')
);

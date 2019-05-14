import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import AppBoard from './App';
import AppPlayground from './Playground';
import './css/tailwind.css';

render(
  <Router>
    <AppBoard path="/" />
    <AppPlayground path="playground" />
  </Router>,
  document.getElementById('root')
);

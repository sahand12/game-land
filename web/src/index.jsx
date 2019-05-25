import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import App from './views/app/App';

render(
  <Router>
    <App path="/" />
  </Router>,
  document.getElementById('root')
);

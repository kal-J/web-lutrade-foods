import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

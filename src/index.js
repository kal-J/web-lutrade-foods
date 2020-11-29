import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import './index.scss';
import * as serviceWorker from './serviceWorker';

// keep window height when keyboard shows..
let initialWindowHeight;
window.onload = () => {
  let viewport = document.querySelector('meta[name=viewport]');
  viewport.setAttribute(
    'content',
    `width=device-width,
    initial-scale=1.0,
    maximum-scale=1.0,
    user-scalable=0`
  );
  initialWindowHeight = `${document.documentElement.offsetHeight}px`;
};

window.onresize = () => {
  // Reset the height in the meta viewport with the initial height of the web page

  document.documentElement.style.setProperty('overflow', 'auto');

  const metaViewport = document.querySelector('meta[name=viewport]');

  metaViewport.setAttribute(
    'content',
    `height=${initialWindowHeight},
    width=device-width,
    initial-scale=1.0`
  );
};

ReactDOM.render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

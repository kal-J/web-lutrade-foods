import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const AppWrapper = (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

export default AppWrapper;

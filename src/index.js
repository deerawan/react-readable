/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

/* eslint-enable react/jsx-filename-extension */

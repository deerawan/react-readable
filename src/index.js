/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';
import reducer from './reducers';

const history = createHistory();
const router = routerMiddleware(history);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger, router)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

/* eslint-enable react/jsx-filename-extension */

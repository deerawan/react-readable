import React from 'react';
import './App.css';
import Main from '../containers/Main';
import Sidebar from '../containers/Sidebar';

const App = () => (
  <div className="App">
    <Sidebar />
    <Main />
  </div>
);

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { JssProvider } from 'react-jss';
import './index.css';
import jssInstance from './jssInstance';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const content = (
  <JssProvider jss={jssInstance}>
    <App />
  </JssProvider>
);

ReactDOM.render(content, document.getElementById('root'));
registerServiceWorker();

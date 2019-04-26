import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StateInspector } from 'reinspect';

ReactDOM.render(
  <StateInspector name='App'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateInspector>,
  document.getElementById('root') as HTMLElement
  // Alternative would have been the following:
  // document.getElementById('root')!
);

registerServiceWorker();

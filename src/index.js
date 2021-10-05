import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { AppProviders } from 'context'



loadDevTools(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById('root')
  );
})

reportWebVitals();




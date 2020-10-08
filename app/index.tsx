import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import { history, configuredStore } from './store';
import './app.global.css';

import { changeFile } from './features/file/fileSlice';

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});

ipcRenderer.on('open-file', (_event, filename) => {
  store.dispatch(changeFile(filename));
});

export type AppDispatch = typeof store.dispatch;

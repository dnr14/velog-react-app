import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import theme from '@/assets/style/theme';
import App from '@/App';
import GlobalStyle from './src/assets/style/global';
import { store } from '@/modules/store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

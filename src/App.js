import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Routers from './Routers';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routers />
      </main>
    </BrowserRouter>
  );
};

export default App;

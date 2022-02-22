import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostPage from './Components/views/PostPage/PostPage';
import UpdatePostPage from './Components/views/UpdatePostPage/UpdatePostPage';
import Insert from './pages/Insert';
import SearchPage from './Components/views/SearchPage/SearchPage';
import Header from './Components/Header/Header';
import NotFound from './pages/404/NotFound';
import Main from './pages/Main';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Switch>
          <Route path="/post/:id" component={PostPage} />
          <Route path="/update/:id" component={UpdatePostPage} />
          <Route path="/insert" component={Insert} />
          <Route path="/search" component={SearchPage} />
          <Route exact path="/" component={Main} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

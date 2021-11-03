import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Components/views/MainPage/MainPage';
import Top from './Components/views/Top/Top';
import PostPage from './Components/views/PostPage/PostPage';
import UpdatePostPage from './Components/views/UpdatePostPage/UpdatePostPage';

const App = () => {
  return (
    <BrowserRouter>
      <Top />
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route exact path="/post/update/:id" component={UpdatePostPage} />
          <Route exact path="/posttest" component={PostPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

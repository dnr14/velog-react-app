import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Components/views/MainPage/MainPage';
import Top from './Components/views/Top/Top';
import PostPage from './Components/views/PostPage/PostPage';
import UpdatePostPage from './Components/views/UpdatePostPage/UpdatePostPage';
import InsertPostPage from './Components/InsertPostPage/InsertPostPage';

const App = () => {
  return (
    <BrowserRouter>
      <Top />
      <div>
        <Switch>
          <Route path="/post/:id" component={PostPage} />
          <Route path="/post/update/:id" component={UpdatePostPage} />
          <Route path="/posttest" component={PostPage} />
          <Route path="/insert" component={InsertPostPage} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

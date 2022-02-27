import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './Components/common/Loading';

const Main = lazy(() => import('@/pages/Main'));
const Post = lazy(() => import('@/pages/Post'));
const Update = lazy(() => import('@/pages/Update'));
const Insert = lazy(() => import('@/pages/Insert'));
const Search = lazy(() => import('@/pages/Search'));
const NotFound = lazy(() => import('@/pages/404/NotFound'));

const Routers = () => {
  return (
    <Suspense fallback={<Loading loding />}>
      <Switch>
        <Route path="/post/:id" component={Post} />
        <Route path="/update/:id" component={Update} />
        <Route path="/insert" component={Insert} />
        <Route path="/search" component={Search} />
        <Route exact path="/" component={Main} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routers;

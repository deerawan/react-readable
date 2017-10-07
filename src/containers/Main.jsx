import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostDetailContainer from './PostDetailContainer';
import PostFormContainer from './PostFormContainer';
import PostListContainer from './PostListContainer';
import CategoryPostListContainer from './CategoryPostListContainer';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={PostListContainer} />
      <Route exact path="/posts/new" component={PostFormContainer} />
      <Route exact path="/posts/edit/:id" component={PostFormContainer} />
      <Route exact path="/:category" component={CategoryPostListContainer} />
      <Route exact path="/:category/:id" component={PostDetailContainer} />
    </Switch>
  </div>
);

export default Main;

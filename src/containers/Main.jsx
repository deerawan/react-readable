import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostDetailContainer from './PostDetailContainer';
import PostFormDisplay from './PostFormDisplay';
import PostListDisplay from './PostListDisplay';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={PostListDisplay} />
      <Route exact path="/posts/new" component={PostFormDisplay} />
      <Route exact path="/posts/edit/:id" component={PostFormDisplay} />
      <Route exact path="/:category" component={PostListDisplay} />
      <Route exact path="/:category/:id" component={PostDetailContainer} />
    </Switch>
  </div>
);

export default Main;

import React from 'react';
import { Route } from 'react-router-dom';
import PostDetail from './PostDetail';
import PostFormDisplay from './PostFormDisplay';
import PostListDisplay from './PostListDisplay';

const Main = () => (
  <div>
    <Route exact path="/" component={PostListDisplay} />
    <Route exact path="/:category" component={PostListDisplay} />
    <Route exact path="/:category/:id" component={PostDetail} />
    <Route exact path="/posts/edit/:id" component={PostFormDisplay} />
    <Route exact path="/posts/new" component={PostFormDisplay} />
  </div>
);

export default Main;

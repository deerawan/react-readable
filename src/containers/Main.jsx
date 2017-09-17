import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, sortPost, deletePost } from '../actions';
import PostList from '../components/PostList';
import SortSelect from '../components/SortSelect';
import PostFormDisplay from './PostFormDisplay';

const Main = props => (
  <div>
    <Route
      exact
      path="/"
      render={() => (
        <div>
          <SortSelect onSortChange={props.sortPost} />
          <PostList posts={props.posts} onDelete={props.deletePost} />
        </div>
      )}
    />
    <Route path="/post-new" component={PostFormDisplay} />
  </div>
);

Main.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  sortPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ post }) => ({
  posts: post,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: dispatch(fetchPosts()),
  sortPost: (sortBy, sortOrder) => dispatch(sortPost(sortBy, sortOrder)),
  deletePost: id => dispatch(deletePost(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

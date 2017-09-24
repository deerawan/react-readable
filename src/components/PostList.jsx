import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostList = props => (
  <div>
    {props.posts.map(post => (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
        <button onClick={() => props.onDelete(post.id)}>Delete</button>
      </li>
    ))}
    <Link to="/post-new">Add new post</Link>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  // onPostClick: PropTypes.func.isRequired,
};

export default PostList;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostList = props => (
  <div>
    {props.posts.map(post => (
      <li key={post.id}>
        <button onClick={() => props.onVoteUp(post.id)}>Vote up</button>
        <button onClick={() => props.onVoteDown(post.id)}>Vote down</button>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
        <button onClick={() => props.onDelete(post.id)}>Delete</button>
        <span>Vote: {post.voteScore}</span>
      </li>
    ))}
    <Link to="/posts/new">Add new post</Link>
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
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

export default PostList;

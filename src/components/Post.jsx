import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Post = props => {
  const { id, title, body } = props.post;
  return (
    <div>
      {title}
      <br />
      {body}
      {/* <Link to={`/posts/edit/${id}`}>Edit</Link> */}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
    author: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default Post;

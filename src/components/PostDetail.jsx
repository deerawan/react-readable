import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import PostMeta from './PostMeta';
import './PostDetail.css';

const Post = props => {
  const { id, title, body } = props.post;
  return (
    <div>
      <div className="post-detail-container">
        <Typography type="display2" gutterBottom>
          {title}
        </Typography>
        <PostMeta post={props.post} />

        <div className="post-detail-content">
          <Typography type="body1" gutterBottom>
            {body}
          </Typography>
        </div>

        <div className="button-actions">
          <Link to={`/posts/edit/${id}`} className="link-button">
            <EditButton />
          </Link>
          <DeleteButton onClick={() => props.onDelete(id)} />
        </div>
      </div>
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
  onDelete: PropTypes.func.isRequired,
};

export default Post;

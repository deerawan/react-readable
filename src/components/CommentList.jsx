import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';

const CommentList = props => (
  <div className="post-comment-list">
    {props.comments.map(comment => (
      <CommentListItem
        comment={comment}
        onEditComment={props.onEditComment}
        onDeleteComment={props.onDeleteComment}
      />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      parentId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;

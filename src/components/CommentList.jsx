import React from 'react';
import Typography from 'material-ui/Typography';
import CommentListItem from './CommentListItem';
import type { Comment } from '../util/definition';

type Props = {
  comments: Comment[],
  onEditComment: Function,
  onDeleteComment: Function,
  onVoteUpComment: Function,
  onVoteDownComment: Function,
};

const CommentList = (props: Props) => (
  <div className="post-comment-list">
    {props.comments.length > 0 ? (
      props.comments.map(comment => (
        <CommentListItem
          key={comment.id}
          comment={comment}
          onEditComment={props.onEditComment}
          onDeleteComment={props.onDeleteComment}
          onVoteUpComment={() => props.onVoteUpComment(comment.id)}
          onVoteDownComment={() => props.onVoteDownComment(comment.id)}
        />
      ))
    ) : (
      <Typography type="paragraph">No comments to display</Typography>
    )}
  </div>
);

export default CommentList;

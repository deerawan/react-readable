import React from 'react';
import MetaAuthor from './MetaAuthor';
import MetaDate from './MetaDate';
import type { Comment } from '../util/definition';

type Props = {
  comment: Comment,
};

const CommentMeta = (props: Props) => {
  const { comment } = props;
  return (
    <div className="meta-container">
      <MetaAuthor author={comment.author} />
      <MetaDate date={comment.timestamp} />
    </div>
  );
};

export default CommentMeta;

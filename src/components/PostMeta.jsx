import React from 'react';

import FolderIcon from 'material-ui-icons/Folder';
import CommentIcon from 'material-ui-icons/Comment';
import MetaAuthor from './MetaAuthor';
import MetaDate from './MetaDate';

import * as label from '../util/label';
import type { Post } from '../util/definition';

type Props = {
  post: Post,
};

const PostMeta = (props: Props) => {
  const { post } = props;
  return (
    <div className="meta-container">
      <MetaAuthor author={post.author} />
      <MetaDate date={post.timestamp} />
      <span className="meta-item">
        <FolderIcon className="meta-icon" />
        <span>{post.category}</span>
      </span>
      <span className="meta-item">
        <CommentIcon className="meta-icon" />
        <span>{label.comment(post.commentsCount)}</span>
      </span>
    </div>
  );
};

export default PostMeta;

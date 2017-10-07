import React from 'react';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import FolderIcon from 'material-ui-icons/Folder';
import CommentIcon from 'material-ui-icons/Comment';
import { format } from 'date-fns';
import * as label from '../util/label';
import type { Post } from '../util/definition';
import './PostMeta.css';

type Props = {
  post: Post,
};

const PostMeta = (props: Props) => {
  const { post } = props;
  return (
    <div className="post-meta-container">
      <span className="post-meta-item">
        <AccountCircleIcon className="post-meta-icon" />
        <span>{post.author}</span>
      </span>
      <span className="post-meta-item">
        <AccessTimeIcon className="post-meta-icon" />
        <span>{format(new Date(post.timestamp), 'DD MMM YYYY HH:mm')}</span>
      </span>
      <span className="post-meta-item">
        <FolderIcon className="post-meta-icon" />
        <span>{post.category}</span>
      </span>
      <span className="post-meta-item">
        <CommentIcon className="post-meta-icon" />
        <span>{label.comment(post.commentsCount)}</span>
      </span>
    </div>
  );
};

export default PostMeta;

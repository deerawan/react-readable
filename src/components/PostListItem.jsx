import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import VoteUpDown from '../components/VoteUpDown';
import PostMeta from './PostMeta';
import type { Post } from '../util/definition';
import './PostListItem.css';

type Props = {
  post: Post,
  onVoteUp: Function,
  onVoteDown: Function,
  onDelete: Function,
};

const PostListItem = (props: Props) => {
  const { post } = props;
  return (
    <Paper className="list-item-container post-list-item-container">
      <VoteUpDown
        score={post.voteScore}
        onVoteUp={() => props.onVoteUp(post.id)}
        onVoteDown={() => props.onVoteDown(post.id)}
      />
      <div className="list-item-content post">
        <Link to={`/${post.category}/${post.id}`} className="no-decor">
          <Typography type="headline">{post.title}</Typography>
        </Link>
        <PostMeta post={post} />
      </div>
      <div className="list-item-actions">
        <Link to={`/posts/edit/${post.id}`} className="link-button">
          <EditButton />
        </Link>
        <DeleteButton onClick={() => props.onDelete(post.id)} />
      </div>
    </Paper>
  );
};

export default PostListItem;

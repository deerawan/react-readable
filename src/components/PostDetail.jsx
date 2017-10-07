import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import PostMeta from './PostMeta';
import VoteUpDown from '../components/VoteUpDown';
import type { Post } from '../util/definition';
import './PostDetail.css';

type Props = {
  post: Post,
  onVoteUp: Function,
  onVoteDown: Function,
  onDelete: Function,
};

const PostDetail = (props: Props) => {
  const { id, title, body, voteScore } = props.post;
  return (
    <div>
      <div className="post-detail-container">
        <div className="post-detail-voting">
          <VoteUpDown
            score={voteScore}
            onVoteUp={() => props.onVoteUp(id)}
            onVoteDown={() => props.onVoteDown(id)}
          />
        </div>
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

export default PostDetail;

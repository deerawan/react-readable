import React from 'react';
import Typography from 'material-ui/Typography';
import PostListItem from './PostListItem';
import type { Post } from '../util/definition';

type Props = {
  posts: Post[],
  onVoteUp: Function,
  onVoteDown: Function,
  onDelete: Function,
};

const PostList = (props: Props) => {
  const { posts } = props;
  return (
    <div>
      {posts.length === 0 ? (
        <Typography type="headline">No posts to display</Typography>
      ) : (
        posts.map(post => (
          <PostListItem
            post={post}
            onVoteUp={props.onVoteUp}
            onVoteDown={props.onVoteDown}
            onDelete={props.onDelete}
          />
        ))
      )}
    </div>
  );
};

export default PostList;

import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {
  fetchPost,
  deletePost,
  voteUpPost,
  voteDownPost,
} from '../actions/post';
import {
  fetchCommentsByPost,
  addComment,
  editComment,
  deleteComment,
  voteUpComment,
  voteDownComment,
  sortComments,
} from '../actions/comment';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import PostDetail from '../components/PostDetail';
import SortSelect from '../components/SortSelect';
import Spinner from '../components/Spinner';
import type { Post, Comment, SortList, SortOption } from '../util/definition';
import * as link from '../util/link';

type Props = {
  post: Post,
  postLoading: boolean,
  comments: Comment[],
  commentSortOptions: SortOption[],
  fetchPost: Function,
  deletePost: Function,
  voteUpPost: Function,
  voteDownPost: Function,
  fetchCommentsByPost: Function,
  addComment: Function,
  editComment: Function,
  deleteComment: Function,
  voteUpComment: Function,
  voteDownComment: Function,
  selectedSort: SortList,
  sortComments: Function,
};

class PostDetailContainer extends React.Component<Props> {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
    this.props.fetchCommentsByPost(postId);
  }

  props: Props;

  render() {
    if (this.props.postLoading) {
      return <Spinner />;
    }
    return this.props.post.id ? (
      <div>
        <PostDetail
          post={this.props.post}
          onVoteUp={this.props.voteUpPost}
          onVoteDown={this.props.voteDownPost}
          onDelete={this.props.deletePost}
        />
        <Divider />
        <div className="post-detail-comment-list">
          <Typography type="display1" gutterBottom>
            Comments
          </Typography>

          <SortSelect
            sort={this.props.selectedSort}
            sortOptions={this.props.commentSortOptions}
            onSortChange={this.props.sortComments}
            visible={this.props.comments.length > 0}
          />
          <CommentList
            comments={this.props.comments}
            onEditComment={this.props.editComment}
            onDeleteComment={this.props.deleteComment}
            onVoteUpComment={this.props.voteUpComment}
            onVoteDownComment={this.props.voteDownComment}
          />
        </div>
        <Divider />
        <div className="post-detail-comment-form">
          <Typography type="display1" gutterBottom>
            Add Comment
          </Typography>
          <CommentForm
            postId={this.props.post.id}
            onAddComment={this.props.addComment}
          />
        </div>
      </div>
    ) : (
      <Typography type="headline">No post to display</Typography>
    );
  }
}

const mapStateToProps = ({ post, comment }) => ({
  post: post.selectedPost,
  postLoading: post.loading,
  comments: comment.comments,
  commentSortOptions: comment.sortOptions,
  selectedSort: comment.selectedSort,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchCommentsByPost: id => dispatch(fetchCommentsByPost(id)),
  deletePost: id => {
    dispatch(deletePost(id));
    dispatch(push(link.home()));
  },
  voteUpPost: id => dispatch(voteUpPost(id)),
  voteDownPost: id => dispatch(voteDownPost(id)),
  addComment: comment => dispatch(addComment(comment)),
  editComment: comment => dispatch(editComment(comment)),
  deleteComment: id => dispatch(deleteComment(id)),
  voteUpComment: id => dispatch(voteUpComment(id)),
  voteDownComment: id => dispatch(voteDownComment(id)),
  sortComments: (sortBy, sortOrder) =>
    dispatch(sortComments(sortBy, sortOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostDetailContainer
);

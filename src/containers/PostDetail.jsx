import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { fetchPost, deletePost } from '../actions/post';
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
import Post from '../components/Post';
import SortSelect from '../components/SortSelect';

class PostDetail extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
    this.props.fetchCommentsByPost(postId);
  }

  render() {
    return (
      <div>
        <Post post={this.props.post} onDelete={this.props.deletePost} />
        <Divider />
        <Typography type="display1" gutterBottom>
          Comments
        </Typography>

        <SortSelect
          sort={this.props.selectedSort}
          onSortChange={this.props.sortComments}
        />
        <CommentList
          comments={this.props.comments}
          onEditComment={this.props.editComment}
          onDeleteComment={this.props.deleteComment}
          onVoteUpComment={this.props.voteUpComment}
          onVoteDownComment={this.props.voteDownComment}
        />
        <Divider />
        <div className="post-comment-form">
          <Typography type="display1" gutterBottom>
            Add Comment
          </Typography>
          <CommentForm
            postId={this.props.post.id}
            onAddComment={this.props.addComment}
          />
        </div>
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
    author: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  fetchPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  fetchCommentsByPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  voteUpComment: PropTypes.func.isRequired,
  voteDownComment: PropTypes.func.isRequired,
  selectedSort: PropTypes.shape({
    by: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
  sortComments: PropTypes.func.isRequired,
};

const mapStateToProps = ({ post, comment }) => ({
  post: post.selectedPost,
  comments: comment.comments,
  selectedSort: comment.selectedSort,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  fetchCommentsByPost: id => dispatch(fetchCommentsByPost(id)),
  deletePost: id => dispatch(deletePost(id)),
  addComment: comment => dispatch(addComment(comment)),
  editComment: comment => dispatch(editComment(comment)),
  deleteComment: id => dispatch(deleteComment(id)),
  voteUpComment: id => dispatch(voteUpComment(id)),
  voteDownComment: id => dispatch(voteDownComment(id)),
  sortComments: (sortBy, sortOrder) =>
    dispatch(sortComments(sortBy, sortOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

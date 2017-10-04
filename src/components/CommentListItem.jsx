import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import { friendlyWords } from '../util/date';
import VoteUpDown from './VoteUpDown';
import CommentForm from './CommentForm';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import './CommentListItem.css';

class CommentListItem extends Component {
  state = {
    isFormOpen: false,
  };
  handleClickEdit = () => {
    this.setState({ isFormOpen: true });
  };
  handleEditComment = ({ id, body }) => {
    this.props.onEditComment({ id, body });
    this.setState({ isFormOpen: false });
  };
  render() {
    const { comment } = this.props;
    return (
      <Paper className="comment-container">
        <VoteUpDown score={comment.voteScore} />
        <div className="comment-content">
          <div className="comment-meta">
            <span className="comment-author meta-item">
              <AccountCircleIcon className="meta-icon" />
              <span className="author">{comment.author}</span>
            </span>
            <span className="comment-date meta-item">
              {friendlyWords(new Date(comment.timestamp))}
            </span>
          </div>

          <div className="comment-body">
            {this.state.isFormOpen ? (
              <CommentForm
                comment={comment}
                onEditComment={this.handleEditComment}
              />
            ) : (
              comment.body
            )}
          </div>
        </div>
        <div className="comment-actions">
          <EditButton onClick={this.handleClickEdit} />
          <DeleteButton
            onClick={() => this.props.onDeleteComment(comment.id)}
          />
        </div>
      </Paper>
    );
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    parentId: PropTypes.string.isRequired,
  }).isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentListItem;

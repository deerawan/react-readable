import * as React from 'react';
import Paper from 'material-ui/Paper';
import VoteUpDown from './VoteUpDown';
import CommentForm from './CommentForm';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import CommentMeta from './CommentMeta';
import './CommentListItem.css';
import type { Comment } from '../util/definition';

type Props = {
  comment: Comment,
  onEditComment: Function,
  onDeleteComment: Function,
  onVoteUpComment: Function,
  onVoteDownComment: Function,
};

class CommentListItem extends React.Component<Props> {
  state = {
    isFormOpen: false,
  };
  props: Props;
  handleClickEdit = () => {
    this.setState({ isFormOpen: true });
  };
  handleCancelEdit = () => {
    this.setState({ isFormOpen: false });
  };
  handleEditComment = ({ id, body }) => {
    this.props.onEditComment({ id, body });
    this.setState({ isFormOpen: false });
  };
  render() {
    const { comment, onVoteUpComment, onVoteDownComment } = this.props;
    return (
      <Paper className="list-item-container">
        <VoteUpDown
          score={comment.voteScore}
          onVoteUp={onVoteUpComment}
          onVoteDown={onVoteDownComment}
        />
        <div className="list-item-content">
          <CommentMeta comment={comment} />

          <div className="comment-body">
            {this.state.isFormOpen ? (
              <CommentForm
                comment={comment}
                onEditComment={this.handleEditComment}
                onCancelButtonClick={this.handleCancelEdit}
              />
            ) : (
              comment.body
            )}
          </div>
        </div>
        <div className="list-item-actions">
          <EditButton onClick={this.handleClickEdit} />
          <DeleteButton
            onClick={() => this.props.onDeleteComment(comment.id)}
          />
        </div>
      </Paper>
    );
  }
}

export default CommentListItem;

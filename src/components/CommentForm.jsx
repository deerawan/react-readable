import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class CommentForm extends Component {
  state = {
    isEditing: false,
    dirty: {
      body: false,
      author: false,
    },
    id: '',
    body: '',
    author: '',
    parentId: '',
    timestamp: '',
  };

  componentWillMount() {
    const { comment } = this.props;
    if (comment) {
      const { id, author, body, timestamp, parentId } = this.props.comment;
      this.setState({
        id,
        author,
        body,
        timestamp,
        parentId,
        isEditing: true,
      });
    }
  }

  handleChange = name => event => {
    const { value } = event.target;

    this.setState(state => ({
      [name]: value,
      dirty: { ...state.dirty, [name]: true },
    }));
  };

  handleCreate = () => {
    const { postId } = this.props;
    const { body, author } = this.state;
    this.props.onAddComment({
      body,
      author,
      parentId: postId,
    });
    this.setState({
      body: '',
      author: '',
      dirty: {
        body: false,
        author: false,
      },
    });
  };

  handleEdit = () => {
    const { id, body } = this.state;
    this.props.onEditComment({
      id,
      body,
    });
  };

  isEmpty = value => value.trim().length === 0;

  validateForm = () => {
    const { body, author, isEditing } = this.state;
    const errors = {
      body: '',
      author: '',
    };

    if (this.isEmpty(body)) {
      errors.body = 'Body should not be empty';
    }
    if (this.isEmpty(author) && !isEditing) {
      errors.author = 'Author should not be empty';
    }

    return {
      valid: Object.keys(errors).every(k => errors[k] === ''),
      errors,
    };
  };
  render() {
    const { body, author, dirty, isEditing } = this.state;
    const { errors, valid } = this.validateForm();
    return (
      <form className="comment-form">
        {!isEditing && (
          <div className="form-group">
            <TextField
              error={!!errors.author && dirty.author}
              id="author"
              label="Author"
              value={author}
              onChange={this.handleChange('author')}
              margin="normal"
              className="small-input"
              helperText={dirty.author && errors.author ? errors.author : ''}
            />
          </div>
        )}
        <div className="form-group">
          <TextField
            error={!!errors.body && dirty.body}
            id="body"
            label="Body"
            multiline
            rows="4"
            value={body}
            onChange={this.handleChange('body')}
            margin="normal"
            className="body-input"
            helperText={dirty.body && errors.body ? errors.body : ''}
          />
        </div>
        <div className="form-group">
          <Button
            raised
            disabled={!valid}
            color="primary"
            onClick={this.state.isEditing ? this.handleEdit : this.handleCreate}
            className="submit-btn"
          >
            {this.state.isEditing ? 'Edit' : 'Create'}
          </Button>
        </div>
      </form>
    );
  }
}

CommentForm.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
  }),
  postId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
};

CommentForm.defaultProp = {
  comment: undefined,
};

export default CommentForm;

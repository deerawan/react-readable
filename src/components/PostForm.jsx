import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import './PostForm.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class PostForm extends Component {
  state = {
    isEditing: false,
    dirty: {
      author: false,
      title: false,
      body: false,
      category: false,
    },
    id: '',
    author: '',
    title: '',
    body: '',
    category: '',
  };

  componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { post: { id } } = nextProps;
    if (id) {
      const { title, body, author, category } = nextProps.post;
      this.setState({
        id,
        title,
        body,
        author,
        category,
        isEditing: true,
      });
    }
  }

  isEmpty = value => value.trim().length === 0;

  handleChange = name => event => {
    const { value } = event.target;

    this.setState(state => ({
      [name]: value,
      dirty: { ...state.dirty, [name]: true },
    }));
  };

  handleCreate = () => {
    const { title, body, category, author } = this.state;
    this.props.addPost({
      title,
      body,
      category,
      author,
    });
  };

  handleEdit = () => {
    const { id, title, body } = this.state;
    this.props.editPost({
      id,
      title,
      body,
    });
  };

  validateForm = () => {
    const { title, body, category, author } = this.state;
    const errors = {
      title: '',
      body: '',
      category: '',
      author: '',
    };

    if (this.isEmpty(title)) {
      errors.title = 'Title should not be empty';
    }
    if (this.isEmpty(body)) {
      errors.body = 'Body should not be empty';
    }
    if (this.isEmpty(author)) {
      errors.author = 'Author should not be empty';
    }
    if (this.isEmpty(category)) {
      errors.category = 'Category should not be empty';
    }

    return {
      valid: Object.keys(errors).every(k => errors[k] === ''),
      errors,
    };
  };

  render() {
    const { title, body, author, category, dirty } = this.state;
    const { errors, valid } = this.validateForm();

    return (
      <Paper className="post-form-container">
        <form className="post-form">
          <div className="form-group">
            <TextField
              error={!!errors.title && dirty.title}
              id="title"
              label="Title"
              value={title}
              onChange={this.handleChange('title')}
              margin="normal"
              className="small-input"
              helperText={dirty.title && errors.title ? errors.title : ''}
            />
          </div>
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
          <FormControl error={!!errors.category && dirty.category} className="category-group">
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              name="category"
              value={category}
              onChange={this.handleChange('category')}
              input={<Input id="category" />}
            >
              {this.props.categories.map(c => (
                <MenuItem key={c.path} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{dirty.category && errors.category ? errors.category : ''}</FormHelperText>
          </FormControl>

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
      </Paper>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
  fetchPost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
    author: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  editPost: PropTypes.func.isRequired,
};

export default PostForm;

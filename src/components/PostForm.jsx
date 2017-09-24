import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {
  state = {
    isEditing: false,
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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

  render() {
    return (
      <div>
        <input name="author" type="text" value={this.state.author} onChange={this.handleInputChange} />
        <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
        <textarea name="body" value={this.state.body} onChange={this.handleInputChange} />
        <select name="category" value={this.state.category} onChange={this.handleInputChange}>
          {this.props.categories.map(category => (
            <option key={category.path} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" onClick={this.state.isEditing ? this.handleEdit : this.handleCreate}>
          {this.state.isEditing ? 'Edit' : 'Create'}
        </button>
      </div>
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

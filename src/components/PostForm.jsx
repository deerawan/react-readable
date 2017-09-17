import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {
  state = {
    author: '',
    title: '',
    body: '',
    category: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { title, body, category, author } = this.state;
    this.props.addPost({
      title,
      body,
      category,
      author,
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
        <button type="submit" onClick={this.handleSubmit}>
          Save
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
};

export default PostForm;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, sortPost, deletePost, voteUpPost, voteDownPost, fetchPostsByCategory } from '../actions/post';
import PostList from '../components/PostList';
import SortSelect from '../components/SortSelect';

class PostListDisplay extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;

    if (category) {
      return this.props.fetchPostsByCategory(category);
    }

    return this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <SortSelect sort={this.props.selectedSort} onSortChange={this.props.sortPost} />
        <PostList
          posts={this.props.posts}
          onVoteUp={this.props.voteUpPost}
          onVoteDown={this.props.voteDownPost}
          onDelete={this.props.deletePost}
        />
      </div>
    );
  }
}

PostListDisplay.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.number,
      category: PropTypes.string,
    })
  ).isRequired,
  sortPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  voteUpPost: PropTypes.func.isRequired,
  voteDownPost: PropTypes.func.isRequired,
  fetchPostsByCategory: PropTypes.func.isRequired,
  selectedSort: PropTypes.shape({
    by: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ post }) => ({
  posts: post.posts,
  selectedSort: post.selectedSort,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
  sortPost: (sortBy, sortOrder) => dispatch(sortPost(sortBy, sortOrder)),
  deletePost: id => dispatch(deletePost(id)),
  voteUpPost: id => dispatch(voteUpPost(id)),
  voteDownPost: id => dispatch(voteDownPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListDisplay);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, sortPost, deletePost, voteUpPost, voteDownPost } from '../actions';
import PostList from '../components/PostList';
import SortSelect from '../components/SortSelect';

class PostListDisplay extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <SortSelect onSortChange={this.props.sortPost} />
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
};

const mapStateToProps = ({ post }) => ({
  posts: post.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  sortPost: (sortBy, sortOrder) => dispatch(sortPost(sortBy, sortOrder)),
  deletePost: id => dispatch(deletePost(id)),
  voteUpPost: id => dispatch(voteUpPost(id)),
  voteDownPost: id => dispatch(voteDownPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListDisplay);

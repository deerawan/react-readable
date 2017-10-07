import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchPosts,
  sortPost,
  deletePost,
  voteUpPost,
  voteDownPost,
  fetchPostsByCategory,
} from '../actions/post';
import PostList from '../components/PostList';
import SortSelect from '../components/SortSelect';
import type { Post, SortList } from '../util/definition';

type Props = {
  posts: Post[],
  selectedSort: SortList,
  sortPost: Function,
  deletePost: Function,
  fetchPosts: Function,
  voteUpPost: Function,
  voteDownPost: Function,
  fetchPostsByCategory: Function,
};

class PostListDisplay extends Component<Props> {
  componentDidMount() {
    const { category } = this.props.match.params;

    if (category) {
      return this.props.fetchPostsByCategory(category);
    }

    return this.props.fetchPosts();
  }

  props: Props;

  render() {
    return (
      <div>
        <SortSelect
          sort={this.props.selectedSort}
          onSortChange={this.props.sortPost}
          visible={this.props.posts.length > 0}
        />
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

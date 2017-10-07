import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPosts,
  sortPost,
  deletePost,
  voteUpPost,
  voteDownPost,
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
};

class PostListContainer extends Component<Props> {
  componentDidMount() {
    this.props.fetchPosts();
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
  sortPost: (sortBy, sortOrder) => dispatch(sortPost(sortBy, sortOrder)),
  deletePost: id => dispatch(deletePost(id)),
  voteUpPost: id => dispatch(voteUpPost(id)),
  voteDownPost: id => dispatch(voteDownPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);

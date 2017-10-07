import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  sortPost,
  deletePost,
  voteUpPost,
  voteDownPost,
  fetchPostsByCategory,
} from '../actions/post';
import PostList from '../components/PostList';
import SortSelect from '../components/SortSelect';
import Spinner from '../components/Spinner';
import type { Post, SortList } from '../util/definition';

type Props = {
  posts: Post[],
  postLoading: boolean,
  selectedSort: SortList,
  sortPost: Function,
  deletePost: Function,
  voteUpPost: Function,
  voteDownPost: Function,
  fetchPostsByCategory: Function,
};

class CategoryPostListContainer extends Component<Props> {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchPostsByCategory(category);
  }

  props: Props;

  render() {
    return this.props.postLoading ? (
      <Spinner />
    ) : (
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
  postLoading: post.loading,
  selectedSort: post.selectedSort,
});

const mapDispatchToProps = dispatch => ({
  fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
  sortPost: (sortBy, sortOrder) => dispatch(sortPost(sortBy, sortOrder)),
  deletePost: id => dispatch(deletePost(id)),
  voteUpPost: id => dispatch(voteUpPost(id)),
  voteDownPost: id => dispatch(voteDownPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryPostListContainer
);

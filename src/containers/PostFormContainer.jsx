import { connect } from 'react-redux';
import { addPost, fetchPost, editPost } from '../actions/post';
import PostForm from '../components/PostForm';

const mapStateToProps = ({ post, category }) => ({
  categories: category.categories,
  post: post.selectedPost,
  posts: post.posts,
  postLoading: post.loading,
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  editPost: post => dispatch(editPost(post)),
  fetchPost: id => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

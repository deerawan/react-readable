import { connect } from 'react-redux';
import { addPost, fetchPost, editPost } from '../actions/post';
import PostForm from '../components/PostForm';

const mapStateToProps = ({ post, category }) => ({
  categories: category,
  post: post.selectedPost,
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  editPost: post => dispatch(editPost(post)),
  fetchPost: id => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

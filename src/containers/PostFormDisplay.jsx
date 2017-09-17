import { connect } from 'react-redux';
import { addPost } from '../actions';
import PostForm from '../components/PostForm';

const mapStateToProps = ({ category }) => ({
  categories: category,
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

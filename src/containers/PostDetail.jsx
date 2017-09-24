import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost } from '../actions';
import Post from '../components/Post';

class PostDetail extends Component {
  componentDidMount() {
    console.log('hehe');
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Post post={this.props.post} />
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
    author: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  fetchPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ post }) => ({
  post: post.selectedPost,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

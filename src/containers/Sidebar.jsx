import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/category';
import { fetchPostsByCategory } from '../actions/index';
import CategoryList from '../components/CategoryList';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <CategoryList categories={this.props.categories} onCategoryClick={this.props.fetchPostByCategory} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchPostByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({ category }) => ({
  categories: category,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPostByCategory: category => dispatch(fetchPostsByCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/category';
import CategoryList from '../components/CategoryList';

const Sidebar = props => (
  <div>
    <CategoryList categories={props.categories} />
  </div>
);

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = ({ category }) => ({
  categories: category,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

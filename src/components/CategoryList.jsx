import React from 'react';
import PropTypes from 'prop-types';

const CategoryList = props => (
  <div>{props.categories.map(category => <li key={category.path}>{category.name}</li>)}</div>
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
};

export default CategoryList;

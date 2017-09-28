import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryList = props => (
  <div>
    {props.categories.map(category => (
      <li key={category.path}>
        <Link to={`/${category.name}`} onClick={() => props.onCategoryClick(category.name)}>
          {category.name}
        </Link>
      </li>
    ))}
  </div>
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default CategoryList;

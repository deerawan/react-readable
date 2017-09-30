import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

const CategoryList = props => (
  <List>
    {props.categories.map(category => (
      <Link
        key={category.name}
        to={`/${category.name}`}
        onClick={() => props.onCategoryClick(category.name)}
        className="menu-item"
      >
        <ListItem button>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <ListItemText primary={category.name} />
        </ListItem>
      </Link>
    ))}
  </List>
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

import React from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import type { Category } from '../util/definition';
import * as link from '../util/link';

type Props = {
  categories: Category[],
  onCategoryClick: Function,
};

const CategoryList = (props: Props) => (
  <List>
    {props.categories.map(category => (
      <Link
        key={category.name}
        to={link.categoryPost(category)}
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

export default CategoryList;

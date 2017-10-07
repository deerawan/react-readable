import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeIcon from 'material-ui-icons/Home';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/category';
import { fetchPostsByCategory } from '../actions/post';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CategoryList from '../components/CategoryList';
import type { Category } from '../util/definition';

type Props = {
  categories: Category[],
  fetchCategories: Function,
  fetchPostByCategory: Function,
};

class Sidebar extends Component<Props> {
  componentDidMount() {
    this.props.fetchCategories();
  }

  props: Props;

  render() {
    return (
      <div>
        <Link to="/" className="link-button">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon className="color-primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Divider />
        <CategoryList
          categories={this.props.categories}
          onCategoryClick={this.props.fetchPostByCategory}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ category }) => ({
  categories: category,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPostByCategory: category => dispatch(fetchPostsByCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeIcon from 'material-ui-icons/Home';
import PublicIcon from 'material-ui-icons/Public';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/category';
import { fetchPostsByCategory } from '../actions/post';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CategoryList from '../components/CategoryList';
import type { Category } from '../util/definition';
import Spinner from '../components/Spinner';

type Props = {
  categories: Category[],
  categoryLoading: boolean,
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
        <a
          href="https://github.com/deerawan/react-readable"
          target="_blank"
          rel="noopener noreferrer"
          className="link-button"
        >
          <ListItem button>
            <ListItemIcon>
              <PublicIcon className="color-primary" />
            </ListItemIcon>
            <ListItemText primary="Github" />
          </ListItem>
        </a>
        <Divider />
        {this.props.categoryLoading ? (
          <Spinner />
        ) : (
          <CategoryList
            categories={this.props.categories}
            onCategoryClick={this.props.fetchPostByCategory}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ category }) => ({
  categoryLoading: category.loading,
  categories: category.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPostByCategory: category => dispatch(fetchPostsByCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

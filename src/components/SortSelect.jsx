import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
import { SORT_ORDER } from '../constant';

class SortSelect extends Component {
  state = {
    sortBy: '',
    sortOrder: '',
  };

  componentWillMount() {
    const { by, order } = this.props.sort;
    this.setState({
      sortBy: by,
      sortOrder: order,
    });
  }

  handleSortByChange = sortBy => {
    this.setState({
      sortBy,
    });
    this.props.onSortChange(sortBy, this.state.sortOrder);
  };

  handleSortOrderChange = sortOrder => {
    this.setState({
      sortOrder,
    });
    this.props.onSortChange(this.state.sortBy, sortOrder);
  };

  render() {
    return (
      <div className="sort-select-container">
        <span className="sort-order">
          {this.state.sortOrder === SORT_ORDER.asc ? (
            <Tooltip id="tooltip-sort-desc-icon" title="Sort asc" placement="bottom">
              <IconButton aria-label="Sort asc" onClick={() => this.handleSortOrderChange(SORT_ORDER.desc)}>
                <ArrowUpwardIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip id="tooltip-sort-desc-icon" title="Sort desc" placement="bottom">
              <IconButton aria-label="Sort desc" onClick={() => this.handleSortOrderChange(SORT_ORDER.asc)}>
                <ArrowDownwardIcon />
              </IconButton>
            </Tooltip>
          )}
        </span>
        <span className="sort-by">
          <Select
            value={this.state.sortBy}
            onChange={event => this.handleSortByChange(event.target.value)}
            input={<Input id="post-sort" />}
          >
            <MenuItem value="voteScore">Vote Score</MenuItem>
            <MenuItem value="timestamp">Time</MenuItem>
          </Select>
        </span>
      </div>
    );
  }
}

SortSelect.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    by: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
};

export default SortSelect;

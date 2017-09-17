import React from 'react';
import PropTypes from 'prop-types';

const SortSelect = props => (
  <div>
    <select name="sortBy" onChange={event => props.onSortChange(event.target.value)}>
      <option value="voteScore">Vote Score</option>
      <option value="timestamp">Timestamp</option>
    </select>
  </div>
);

SortSelect.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default SortSelect;

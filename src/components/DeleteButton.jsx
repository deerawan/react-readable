import React from 'react';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import PropTypes from 'prop-types';

const DeleteButton = props => (
  <span>
    <Button raised color="accent" onClick={props.onClick}>
      <DeleteIcon className="icon-button" /> Delete
    </Button>
  </span>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;

import React from 'react';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import PropTypes from 'prop-types';

const EditButton = props => (
  <span>
    <Button raised color="primary" onClick={props.onClick}>
      <ModeEditIcon className="icon-button" /> Edit
    </Button>
  </span>
);

EditButton.propTypes = {
  onClick: PropTypes.func,
};

export default EditButton;

import React from 'react';
import Button from 'material-ui/Button';
import ModeEdit from 'material-ui-icons/ModeEdit';

const EditButton = props => (
  <span>
    <Button raised color="primary">
      <ModeEdit className="icon-button" /> Edit
    </Button>
  </span>
);

export default EditButton;

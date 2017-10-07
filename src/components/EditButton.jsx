import React from 'react';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

type Props = {
  onClick: Function,
};

const EditButton = (props: Props) => (
  <span>
    <Button raised color="primary" onClick={props.onClick}>
      <ModeEditIcon className="icon-button" /> Edit
    </Button>
  </span>
);

export default EditButton;

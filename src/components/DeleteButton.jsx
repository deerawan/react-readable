import React from 'react';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';

type Props = {
  onClick: Function,
};

const DeleteButton = (props: Props) => (
  <span>
    <Button raised color="accent" onClick={props.onClick}>
      <DeleteIcon className="icon-button" /> Delete
    </Button>
  </span>
);

export default DeleteButton;

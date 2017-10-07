import React from 'react';
import Button from 'material-ui/Button';
import SaveIcon from 'material-ui-icons/Save';

type Props = {
  disabled: boolean,
  isEditing: boolean,
  onClick: Function,
};

const SubmitButton = (props: Props) => (
  <Button
    raised
    disabled={props.disabled}
    color="primary"
    onClick={props.onClick}
    className="submit-btn"
  >
    <SaveIcon className="icon-button" /> {props.isEditing ? 'Update' : 'Create'}
  </Button>
);

export default SubmitButton;

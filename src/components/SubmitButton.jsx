import React from 'react';
import Button from 'material-ui/Button';
import SaveIcon from 'material-ui-icons/Save';
import { CircularProgress } from 'material-ui/Progress';

type Props = {
  disabled: boolean,
  isEditing: boolean,
  loading: boolean,
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
    {props.loading ? (
      <CircularProgress size={15} className="icon-button spinner-icon" />
    ) : (
      <SaveIcon className="icon-button" />
    )}
    {props.isEditing ? 'Update' : 'Add'}
  </Button>
);

export default SubmitButton;

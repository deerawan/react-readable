import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import './Spinner.css';

type Props = {
  size: number,
};

const Spinner = (props: Props) => (
  <div className="spinner">
    <CircularProgress size={props.size} />
  </div>
);

export default Spinner;

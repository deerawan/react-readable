import React from 'react';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import { dateTimeFormat } from '../util/date';

type Props = {
  date: number | string,
};

const MetaDate = (props: Props) => (
  <span className="meta-item">
    <AccessTimeIcon className="meta-icon" />
    <span>{dateTimeFormat(props.date)}</span>
  </span>
);

export default MetaDate;

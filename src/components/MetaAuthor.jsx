import React from 'react';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';

type Props = {
  author: string,
};

const MetaAuthor = (props: Props) => (
  <span className="meta-item">
    <AccountCircleIcon className="meta-icon" />
    <span>{props.author}</span>
  </span>
);

export default MetaAuthor;

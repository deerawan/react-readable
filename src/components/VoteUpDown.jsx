import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import './VoteUpDown.css';

const VoteUpDown = props => {
  const { score } = props;
  return (
    <div className="vote-up-down">
      <IconButton
        aria-label="Vote up"
        onClick={props.onVoteUp}
        className="vote-icon"
      >
        <ThumbUpIcon />
      </IconButton>
      <Avatar
        className={score >= 0 ? 'vote-score-positive' : 'vote-score-negative'}
      >
        <span>{score}</span>
      </Avatar>
      <IconButton
        aria-label="Vote down"
        onClick={props.onVoteDown}
        className="vote-icon"
      >
        <ThumbDownIcon />
      </IconButton>
    </div>
  );
};

VoteUpDown.propTypes = {
  score: PropTypes.number.isRequired,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

export default VoteUpDown;

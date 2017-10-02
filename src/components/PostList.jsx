import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Typography from 'material-ui/Typography';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import AccessTime from 'material-ui-icons/AccessTime';
import AccountCircle from 'material-ui-icons/AccountCircle';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Folder from 'material-ui-icons/Folder';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
  },
  voteUp: {
    cursor: 'pointer',
    color: '#B9B9B9',
  },
  voteDown: {
    cursor: 'pointer',
    color: '#B9B9B9',
  },
  scoreNegative: {
    backgroundColor: red[400],
  },
  scorePositive: {
    backgroundColor: green[400],
  },
  voteScore: {
    backgroundColor: blue[400],
  },
  post: {
    flexGrow: 2,
  },
  headlineLink: {
    textDecoration: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonIcon: {
    width: '15px',
    height: '15px',
    marginRight: '4px',
  },
  postMeta: {
    color: '#666',
    fontSize: '14px',
    marginTop: '7px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  postMetaItem: {
    paddingRight: '10px',
    display: 'flex',
    alignItems: 'center',
  },
});

const PostList = props => {
  const { classes } = props;

  return (
    <div>
      {props.posts.map(post => (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div className={classes.vote}>
              <IconButton aria-label="Vote up" onClick={() => props.onVoteUp(post.id)} className={classes.voteUp}>
                <ThumbUp />
              </IconButton>
              <Avatar className={post.voteScore >= 0 ? classes.scorePositive : classes.scoreNegative}>
                <span>{post.voteScore}</span>
              </Avatar>
              <IconButton aria-label="Vote down" onClick={() => props.onVoteDown(post.id)} className={classes.voteDown}>
                <ThumbDown />
              </IconButton>
            </div>
            <div className={classes.post}>
              <Link to={`/posts/${post.id}`} className={classes.headlineLink}>
                <Typography type="headline">{post.title}</Typography>
              </Link>
              <div className={classes.postMeta}>
                <span className={classes.postMetaItem}>
                  <AccessTime className={classes.buttonIcon} />
                  <span>{new Date(post.timestamp).toDateString()}</span>
                </span>
                <span className={classes.postMetaItem}>
                  <AccountCircle className={classes.buttonIcon} />
                  <span>{post.author}</span>
                </span>
                <span className={classes.postMetaItem}>
                  <Folder className={classes.buttonIcon} />
                  <span>{post.category}</span>
                </span>
              </div>
              <Button raised color="primary" className={classes.button}>
                <ModeEdit className={classes.buttonIcon} /> Edit
              </Button>
              <Button raised color="accent" className={classes.button} onClick={() => props.onDelete(post.id)}>
                <Delete className={classes.buttonIcon} /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.number,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);

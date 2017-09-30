import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import blue from 'material-ui/colors/blue';
import Typography from 'material-ui/Typography';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  vote: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
  },
  voteArrow: {
    margin: '0 auto',
    cursor: 'pointer',
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
});

const PostList = props => {
  const { classes } = props;

  return (
    <div>
      {props.posts.map(post => (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div className={classes.vote}>
              <KeyboardArrowUp onClick={() => props.onVoteUp(post.id)} className={classes.voteArrow} />
              <Avatar className={classes.voteScore}>
                <span>{post.voteScore}</span>
              </Avatar>
              <KeyboardArrowDown onClick={() => props.onVoteDown(post.id)} className={classes.voteArrow} />
            </div>
            <div className={classes.post}>
              <Link to={`/posts/${post.id}`} className={classes.headlineLink}>
                <Typography type="headline">{post.title}</Typography>
              </Link>
              <Button raised color="primary" className={classes.button} onClick={() => props.onDelete(post.id)}>
                <ModeEdit className={classes.buttonIcon} /> Edit
              </Button>
              <Button raised color="accent" className={classes.button}>
                <Delete className={classes.buttonIcon} /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Link to="/posts/new">Add new post</Link>
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

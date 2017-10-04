import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Typography from 'material-ui/Typography';
import AccessTime from 'material-ui-icons/AccessTime';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Folder from 'material-ui-icons/Folder';
import { format } from 'date-fns';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import VoteUpDown from '../components/VoteUpDown';

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
            <VoteUpDown
              score={post.voteScore}
              onVoteUp={() => props.onVoteUp(post.id)}
              onVoteDown={() => props.onVoteDown(post.id)}
            />
            <div className={classes.post}>
              <Link
                to={`/${post.category}/${post.id}`}
                className={classes.headlineLink}
              >
                <Typography type="headline">{post.title}</Typography>
              </Link>
              <div className={classes.postMeta}>
                <span className={classes.postMetaItem}>
                  <AccessTime className={classes.buttonIcon} />
                  <span>
                    {format(new Date(post.timestamp), 'DD MMM YYYY HH:mm')}
                  </span>
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
              <div className="button-actions">
                <Link to={`/posts/edit/${post.id}`} className="link-button">
                  <EditButton />
                </Link>
                <DeleteButton onClick={() => props.onDelete(post.id)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {props.posts.length === 0 ? (
        <Typography type="headline">No posts under this category</Typography>
      ) : (
        ''
      )}
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

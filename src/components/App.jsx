import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import './App.css';
import Main from '../containers/Main';
import Sidebar from '../containers/Sidebar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '768px',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    order: 1,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  titleHeader: {
    marginTop: '10px',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
});

const App = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              All Posts
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography type="display1" align="center" className={classes.titleHeader}>
              Readable
            </Typography>
          </div>
          <Divider />
          <Sidebar className="sidebar" />
        </Drawer>
        <main className={classes.content}>
          <Main />
          <Button fab color="primary" aria-label="add" className={classes.addButton}>
            <AddIcon />
          </Button>
        </main>
      </div>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

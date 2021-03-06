import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/Add';
import { Link } from 'react-router-dom';
import './App.css';
import Main from '../containers/Main';
import Sidebar from '../containers/Sidebar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '768px',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    minHeight: '768px',
    backgroundColor: '#fafafa',
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
    paddingTop: theme.spacing.unit * 7,
    paddingBottom: theme.spacing.unit * 7,
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
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

type Props = {
  classes: any,
};

const App = (props: Props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Link to="/" className="no-decor">
              <Typography type="title" noWrap className="app-bar-title">
                READABLE
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader} />
          <Divider />
          <Sidebar className="sidebar" />
        </Drawer>
        <main className={classes.content}>
          <Main />
          <div className={classes.addButton}>
            <Tooltip placement="left" title="Add post" className="tooltip-lg">
              <Link to="/posts/new">
                <Button fab color="primary" aria-label="add">
                  <AddIcon />
                </Button>
              </Link>
            </Tooltip>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withStyles(styles)(App);

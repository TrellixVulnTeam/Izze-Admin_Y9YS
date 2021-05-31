import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Drawer,
  Divider,
  Paper,
  Avatar,
  Typography,
  Toolbar,
} from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import Navigation from './Navigation';
import NavigationConfig from './NavigationConfig';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
    overflowY: 'auto',
  },
  content: {
    padding: theme.spacing(2),
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  navigation: {
    marginTop: theme.spacing(2),
  },
  drawer: {
    width: 255,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 255,
    // zIndex: -100,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const NavBar = (props: any) => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
        <Avatar
          alt='Person'
          className={classes.avatar}
          component={RouterLink}
          src={'/profile/1/timeline'}
          to='/profile/1/timeline'
        />
        <Typography className={classes.name} variant='h4'>
          Admin
        </Typography>
        <Typography variant='body2'>This is Admin</Typography>
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {NavigationConfig.map((list) => (
          <Navigation
            component='div'
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          className={classes.drawer}
          variant='temporary'
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={onMobileClose}
          open={openMobile}
        >
          <div className={classes.drawerContainer}>{navbarContent}</div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          <Toolbar />
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;

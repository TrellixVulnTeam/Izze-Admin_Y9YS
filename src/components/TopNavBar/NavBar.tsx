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
import EditIcon from '@material-ui/icons/Edit';

import MobxObserver from '../../Mobx/Helpers/MobxObserver';
import { useStore } from '../../Mobx/Helpers/UseStore';
import { toJS } from 'mobx';

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
  const { UserStore } = useStore();
  const { UserDetails, MenuConfig } = toJS(UserStore)


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
          alt={UserDetails?.name}
          className={classes.avatar}
          src={UserDetails?.image?.url}
        />
        <Typography className={classes.name} variant='h4'>
          {UserDetails?.name}
        </Typography>
        <Typography variant='body2'>{UserDetails?.user_type}</Typography>
        <Typography variant= 'subtitle2'><RouterLink to = '/home/admin-profile'>View Profile</RouterLink><EditIcon style={{fontSize : '15px', marginLeft : '10px'}}/></Typography>
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {MenuConfig.map((list: any) => (
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

export default MobxObserver(NavBar);

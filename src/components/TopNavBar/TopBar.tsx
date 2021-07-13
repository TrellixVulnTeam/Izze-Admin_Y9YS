/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import LogoImage from '../../assets/Images/logo.png';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import useConfModel from '../../hook/useConfModel';
import { LogoutUser } from '../../utils/FirebaseUtils';

const useStyles = makeStyles((theme: any) => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.green.main,
  },
  flexGrow: {
    flexGrow: 1,
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit',
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit',
    },
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100,
  },
  searchPopperContent: {
    marginTop: theme.spacing(1),
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900],
    },
  },
  trialIcon: {
    marginRight: theme.spacing(1),
  },
  notificationsButton: {
    marginLeft: theme.spacing(1),
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600],
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
    textTransform: 'capitalize',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  logoImage: {
    width: theme.spacing(12),
    height: theme.spacing(5),
    filter: 'brightness(10)'

  }
}));

const TopBar = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const ConfModel = useConfModel();
  const { onOpenNavBarMobile, className, ...rest } = props;


  const handleLogout = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      LogoutUser().then(async (res: any) => {
        setLoading(false);
        closeModel();
      })
        .catch((err: any) => {
          setLoading(false);
        });
    };
    openModel(submitFunction, 'Are you sure want to Logout?', 'Logout');
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        {/* <RouterLink to='/'> */}
        <img alt='Logo' className={classes.logoImage} src={LogoImage} />
        {/* </RouterLink> */}
        <div className={classes.flexGrow} />


        <Button
          className={classes.logoutButton}
          color="inherit"
          onClick={handleLogout}
        >
          <InputIcon className={classes.logoutIcon} />
          <Hidden mdDown>Logout</Hidden>
        </Button>

        <Hidden lgUp>
          <IconButton color='inherit' onClick={onOpenNavBarMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

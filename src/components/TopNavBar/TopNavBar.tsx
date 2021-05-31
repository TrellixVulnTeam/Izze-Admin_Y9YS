import React, { Suspense, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

// import { NavBar, TopBar, ChatBar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topBar: {
    zIndex: 1100,
    position: 'fixed',
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  navBar: {
    position: 'fixed',
    width: '17%',
    flex: '0 0 auto',
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
  },
}));

const TopNavBar = (props: any) => {
  const { route } = props;

  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <div className={classes.root}>
      <TopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={12} lg={2}>
            <NavBar
              className={classes.navBar}
              onMobileClose={handleNavBarMobileClose}
              openMobile={openNavBarMobile}
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <main className={classes.content}>
              <Suspense fallback={<div>Loading</div>}>
                <Toolbar />
                <Outlet />
              </Suspense>
            </main>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TopNavBar;

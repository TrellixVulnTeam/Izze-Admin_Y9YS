import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import Container from '@material-ui/core/Container';

const drawerWidth = 255;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    fontSize: 20,
    padding: theme.spacing(0, 2),
    cursor: 'pointer',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  searchInput: {
    color: 'white',
    '& input::placeholder': {
      opacity: 1,
      color: 'white',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: -100,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 'auto',
    padding: 10,
  },
  sidebarLableStyle: {
    fontSize: 17,
    fontWeight: 500,
  },
}));

function TopBar(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpand, setIsExpand] = React.useState(false);

  const logoutFunction = () => {
    alert('done');
  };

  const expandMore = () => {
    setIsExpand(!isExpand);
    alert('done');
  };

  // console.log(props);

  const MobileTopbar = () => {
    return (
      <div>
        <AppBar style={{ backgroundColor: '#41A58D' }} position='fixed'>
          <Toolbar>
            <Grid container>
              <Grid item xs={4}>
                <div style={{ paddingTop: '5px' }}>
                  <Typography
                    className={classes.title}
                    style={{ textAlign: 'start' }}
                  >
                    Izze Admin
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <InputBase
                    className={classes.searchInput}
                    placeholder='Search…'
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div>
                  <MenuIcon />
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Container style={{ paddingTop: '65px' }} maxWidth='xl'>
          {props.children}
        </Container>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {isMobile ? (
        <MobileTopbar />
      ) : (
        <div>
          <AppBar
            className={classes.appBar}
            position='fixed'
            style={{ backgroundColor: '#41A58D', boxShadow: 'none' }}
          >
            <Toolbar>
              <Grid container>
                <Grid item xs={2}>
                  <div>
                    <Typography className={classes.title}>
                      Izze Admin
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  {/* <InputBase
                    className={classes.searchInput}
                    placeholder='Search…'
                    inputProps={{ 'aria-label': 'search' }}
                  /> */}
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  {props.location.pathname === '/' ? (
                    ''
                  ) : (
                    <div>
                      <Button
                        style={{
                          backgroundColor: 'white',
                          width: '50%',
                          textTransform: 'capitalize',
                        }}
                        onClick={logoutFunction}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {props.location.pathname === '/' ? (
            <div style={{ paddingTop: '65px' }}>{props.children}</div>
          ) : (
            <Grid container>
              <Grid item xs={2}>
                <Drawer
                  className={classes.drawer}
                  variant='permanent'
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <Toolbar />
                  <div className={classes.drawerContainer}>
                    <div style={{ padding: 20 }}>
                      <Avatar alt='Remy Sharp' className={classes.large} />
                      <Typography
                        style={{
                          marginTop: '15px',
                          fontSize: 20,
                          fontWeight: 500,
                        }}
                      >
                        Admin
                      </Typography>
                    </div>
                    <Divider />
                    <div>
                      <List>
                        <ListItem style={{ marginTop: 10 }} button>
                          <ListItemIcon style={{ minWidth: 40 }}>
                            <HomeIcon style={{ fontSize: 30 }} />
                          </ListItemIcon>
                          <Typography className={classes.sidebarLableStyle}>
                            OverView
                          </Typography>
                        </ListItem>

                        <ListItem
                          style={{ marginTop: 10 }}
                          onClick={expandMore}
                          button
                        >
                          <ListItemIcon style={{ minWidth: 40 }}>
                            <DashboardIcon style={{ fontSize: 25 }} />
                          </ListItemIcon>
                          <Typography className={classes.sidebarLableStyle}>
                            DashBoards
                          </Typography>
                          <ExpandMoreIcon
                            className={
                              isExpand
                                ? 'expandmoreIconanimation'
                                : 'expandmoreIcon'
                            }
                          />
                        </ListItem>

                        <ListItem
                          style={{ marginTop: 10 }}
                          onClick={expandMore}
                          button
                        >
                          <ListItemIcon style={{ minWidth: 40 }}>
                            <BarChartIcon style={{ fontSize: 30 }} />
                          </ListItemIcon>
                          <Typography className={classes.sidebarLableStyle}>
                            Management
                          </Typography>
                          <ExpandMoreIcon
                            className={
                              isExpand
                                ? 'expandmoreIconanimation'
                                : 'expandmoreIcon'
                            }
                          />
                        </ListItem>
                      </List>
                    </div>
                  </div>
                </Drawer>
              </Grid>
              <Grid item xs={10}>
                {/* <Container maxWidth='xl'> */}
                <div style={{ paddingTop: '65px' }}>{props.children}</div>
                {/* </Container> */}
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </div>
  );
}

export default TopBar;

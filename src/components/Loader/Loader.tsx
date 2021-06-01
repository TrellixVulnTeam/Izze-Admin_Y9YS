// eslint-disable-next-line
import React, { useEffect } from 'react';
import { Box, LinearProgress } from '@material-ui/core';
// import React from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    boxRoot: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.green.main,
      backgroundColor: 'white',
    },
  }),
);

const PageLoader = () => {
  const classes = useStyles()

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <Box className={classes.boxRoot}    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default PageLoader;



// import React from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme: any) =>
//   createStyles({
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: theme.palette.green.main,
//       backgroundColor: 'white'
//     },
//   }),
// );

// const Loader = () => {
//   const classes = useStyles();
//   return (
//     <div>
//       <Backdrop className={classes.backdrop} open={true}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </div>
//   );
// }

// export default Loader

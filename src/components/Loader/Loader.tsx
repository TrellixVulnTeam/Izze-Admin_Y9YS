// eslint-disable-next-line
import React, { useEffect } from 'react';
import { Box, TableCell, TableRow } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

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
    lColor: {
      color: theme.palette.green.main,
    }
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

export const TableLoader = (props: any) => {
  const { colSpan = 10 } = props
  const classes = useStyles()
  return (
    <TableRow>
      <TableCell align='center' colSpan={colSpan}>
        <CircularProgress className={classes.lColor} />
      </TableCell>
    </TableRow>
  )
}

export const TableNoData = (props: any) => {
  const { colSpan = 10, children } = props
  const classes = useStyles()
  return (
    <TableRow>
      <TableCell align='center' colSpan={colSpan}>
        {children}
      </TableCell>
    </TableRow>
  )
}

export default PageLoader;



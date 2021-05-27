import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '40%',
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
  },
}));

function Model(props: any) {
  const classes = useStyles();
  console.log(props);
  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.onCancel}
      >
        <div
          style={
            props.width100
              ? { width: '80%' }
              : props.width50
              ? { width: '50%' }
              : props.width30
              ? { width: '30%' }
              : {}
          }
          className={classes.paper}
        >
          {props.children}
        </div>
      </Modal>
    </div>
  );
}

export default Model;

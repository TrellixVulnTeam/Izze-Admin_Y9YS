import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useContext, useState } from 'react';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    dialogRoot: {
      'z-index': '3000 !important',
    },
    themeButton: {
      color: theme.palette.white,
      backgroundColor: theme.palette.green.main,
      '&:hover': {
        backgroundColor: theme.palette.green.dark
      }
    },
    lColor: {
      color: 'white'
    }
  })
);


export const confModelContext = React.createContext<any>(null);

export const ConfModelProvider = (props: any) => {
  const { children } = props
  const [model, setModel] = useState(false)
  const [successFunction, setSuccessFunction] = useState(() => () => new Function);
  const [confirmText, setConfirmText] = useState('');
  const [confirmButtonText, setConfirmButtonText] = useState('');
  const [loading, setLoading] = useState(false)

  const classes = useStyles()

  const openModel = (successFunction: any, confirmText = 'Are you sure want to Delete?', confirmButtonText = 'Delete') => {
    setModel(true)
    setSuccessFunction(() => () => successFunction)
    setConfirmText(confirmText)
    setConfirmButtonText(confirmButtonText)
  }

  const closeModel = () => {
    setModel(false)
  }

  const onDelete = () => {
    successFunction()()
  }

  const ProviderValue = {
    openModel: openModel,
    closeModel: closeModel,
    setLoading
  }
  return (

    <confModelContext.Provider value={ProviderValue} >
      {children}
      <Dialog
        open={model}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModel}
        maxWidth="sm"
        fullWidth
        className={classes.dialogRoot}
        aria-labelledby="alert-dialog-title"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeModel} disabled={loading} >
            Cancel
          </Button>
          <Button className={classes.themeButton} variant="outlined" onClick={() => onDelete()} disabled={loading} autoFocus>
            {loading ? <CircularProgress size={24} className={classes.lColor} /> : confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </confModelContext.Provider>
  )

}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useConfModel = () => {
  return useContext(confModelContext);
};

export default useConfModel;

import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(0.5),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles((theme: any) => ({
  modelStyle: {
    '& .MuiDialog-paperWidthSm': {
      width: '50%',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
        position: 'relative',
      },
    },
  },
  smallModel: {
    '& .MuiDialog-paperWidthSm': {
      width: '30%',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
        position: 'relative',
      },
    },
  },
  largeModel: {
    '& .MuiDialog-paperWidthSm': {
      width: '80%',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
        position: 'relative',
      },
    },
  },
}));

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function DialogBox(props: any) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        onClose={props.close}
        aria-labelledby='customized-dialog-title'
        open={props.open}
        className={
          props.normal
            ? classes.modelStyle
            : props.small
            ? classes.smallModel
            : props.large
            ? classes.largeModel
            : classes.modelStyle
        }
      >
        {props.Title && (
          <DialogTitle id='customized-dialog-title' onClose={props.close}>
            {props.Title}
          </DialogTitle>
        )}

        <DialogContent dividers>{props.children}</DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={props} color='primary'>
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
export default DialogBox;

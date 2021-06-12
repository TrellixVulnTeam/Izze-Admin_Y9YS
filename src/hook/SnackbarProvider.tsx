/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from 'react';
import { IconButton, Snackbar, SnackbarOrigin } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

export const SnackbarContext = React.createContext(undefined);

const initialOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center'
};

const SnackbarAutoHideDuration: number = 3000;

export type Severity = 'success' | 'info' | 'warning' | 'error' | undefined;

interface stateType {
  open: boolean;
  message: string;
  origin: SnackbarOrigin;
  severity: Severity;
  autoHide?: boolean;
  autoHideDuration: number;
}

const initialState: stateType = {
  open: false,
  message: '',
  origin: initialOrigin,
  severity: undefined,
  autoHide: true,
  autoHideDuration: SnackbarAutoHideDuration
};

class SnackbarProvider extends React.Component {
  state: stateType = initialState;

  showSnackBar = (
    message: string,
    severity?: Severity,
    position?: SnackbarOrigin,
    autoHide?: boolean,
    autoHideDuration?: number
  ) => {
    this.setState({
      open: true,
      message,
      origin: position || initialState.origin,
      severity,
      autoHide: autoHide || initialState.autoHide,
      autoHideDuration: autoHideDuration || initialState.autoHideDuration
    });
  };

  handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState(initialState);
  };

  render() {
    const {
      open,
      origin,
      severity,
      message,
      autoHide,
      autoHideDuration
    } = this.state;
    const ProviderValue: any = {
      show: this.showSnackBar
    };
    return (
      <SnackbarContext.Provider value={ProviderValue}>
        {severity ? (
          <Snackbar
            anchorOrigin={origin}
            open={open}
            onClose={this.handleClose}
            autoHideDuration={autoHide ? autoHideDuration : null}
          >
            <Alert
              onClose={this.handleClose}
              severity={severity}
              variant="filled"
            >
              {message}
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar
            anchorOrigin={origin}
            open={open}
            onClose={this.handleClose}
            autoHideDuration={autoHide ? autoHideDuration : null}
            message={message}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        )}
        {this.props.children}
      </SnackbarContext.Provider>
    );
  }
}

export default SnackbarProvider;

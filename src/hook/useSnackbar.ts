import { useContext } from 'react';
import { SnackbarOrigin } from '@material-ui/core';

import { Severity, SnackbarContext } from './SnackbarProvider';

interface ISnackBar {
  /**
   * Shows a Snackbar with Alerts like 'error', 'success', 'warning', 'info'
   * By default it shows without Alerts
   * @Example
   * show('Info message', 'info', { vertical: 'top', horizontal: 'center' }, true, 3000)
   */
  show: (
    message: string,
    severity?: Severity,
    /**
     * Position the Snackbar vertically and horizontally
     *
     * Example  { vertical: 'top', horizontal: 'center' }
     */
    position?: SnackbarOrigin,
    autoHide?: boolean,
    autoHideDuration?: number
  ) => any;
}

const useSnackbar = (): ISnackBar => {
  const snackBar = useContext(SnackbarContext);

  return (snackBar as unknown) as ISnackBar;
};

export default useSnackbar;

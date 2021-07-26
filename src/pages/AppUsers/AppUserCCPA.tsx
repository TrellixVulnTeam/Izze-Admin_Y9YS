import {
  Card, Table, TableBody, TableCell, TextField,
  TableHead, TableRow, Typography, Button,
  Dialog, DialogActions, DialogContent, Grid, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import React, { useEffect, useState } from 'react';
import getDropValues, { CcpaStatus, NoOption } from '../../utils/PlanDropdowns';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import { cloneDeep } from 'lodash';

const useStyles = makeStyles((theme: any) => ({
  marginTop10: {
    marginTop: 10
  },
  lColor: {
    color: 'white',
  },
  themeButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  noTextTransform: {
    textTransform: 'none'
  }
}));

const AppUserCCPA = (props: any) => {
  const classes = useStyles();

  const { data, onRefresh } = props;
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    setFormData(data)
  }, [props]);

  return (
    <div>
      <Typography variant="body1">GDPR</Typography>
      <Card>
        <Table>
          <TableBody>
            <TableRow >
              <TableCell>Share your personal data</TableCell>
              <TableCell>{formData?.isSharePersonalData == '0' ? 'No' : 'Yes'}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Protect your data</TableCell>
              <TableCell>{formData?.isProtectYourData == '0' ? 'No' : 'Yes'}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Personal Information</TableCell>
              <TableCell>{formData?.isPersonalInformation == '0' ? 'No' : 'Yes'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {formData?.ccpa_access_data &&
        <div className={classes.marginTop10}>
          <Typography variant="body1">CCPA Access your data</Typography>
          <Card>
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell>Name</TableCell>
                  <TableCell>{formData?.ccpa_access_data?.firstName + ' ' + formData?.ccpa_access_data?.lastName}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Email</TableCell>
                  <TableCell>{formData?.ccpa_access_data?.email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>State</TableCell>
                  <TableCell>{formData?.ccpa_access_data?.state}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Status</TableCell>
                  <TableCell>{getDropValues(CcpaStatus, formData?.ccpa_access_data?.status)}</TableCell>
                  <TableCell><ChangeStatusModel data={formData?.ccpa_access_data} apiUrl={'app/ccpaUpdateAccessData'} onSuccess={onRefresh} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      }

      {formData?.ccpa_share_data &&
        <div className={classes.marginTop10}>
          <Typography variant="body1">CCPA Share your data</Typography>
          <Card>
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell>Email</TableCell>
                  <TableCell>{formData?.ccpa_share_data?.email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>State</TableCell>
                  <TableCell>{formData?.ccpa_share_data?.state}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Status</TableCell>
                  <TableCell>{getDropValues(CcpaStatus, formData?.ccpa_share_data?.status)}</TableCell>
                  <TableCell><ChangeStatusModel data={formData?.ccpa_share_data} apiUrl={'app/ccpaUpdateShareData'} onSuccess={onRefresh} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      }

      {formData?.ccpa_delete_data &&
        <div className={classes.marginTop10}>
          <Typography variant="body1">CCPA Delete your data</Typography>
          <Card>
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell>Name</TableCell>
                  <TableCell>{formData?.ccpa_delete_data?.firstName + ' ' + formData?.ccpa_delete_data?.lastName}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Email</TableCell>
                  <TableCell>{formData?.ccpa_delete_data?.email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>State</TableCell>
                  <TableCell>{formData?.ccpa_delete_data?.state}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Status</TableCell>
                  <TableCell>{getDropValues(CcpaStatus, formData?.ccpa_delete_data?.status)}</TableCell>
                  <TableCell><ChangeStatusModel data={formData?.ccpa_delete_data} apiUrl={'app/ccpaUpdateDeleteData'} onSuccess={onRefresh} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      }
    </div>
  );
};


export const ChangeStatusModel = (props: any) => {
  const classes = useStyles();
  const { onSuccess } = props;
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(props?.data);
  const [apiUrl, setApiUrl] = useState(props.apiUrl);
  const [status, setStatus] = useState(props?.data?.status);

  const handleModel = () => {
    setIsOpen(!isOpen);
    setSubmitting(false);
  }

  const onSubmit = () => {
    if (status == '') {
      Snackbar.show('Status required', 'error');
      return
    }
    setSubmitting(true);
    Post(apiUrl, { id: formData._id, status })
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        handleModel();
        onSuccess()
      })
      .catch((err: any) => {
        setSubmitting(false);
        Snackbar.show(err.message, 'error');
      });
  }

  useEffect(() => {
    const { data, apiUrl } = cloneDeep(props)
    const { status } = cloneDeep(data)
    setFormData(data)
    setStatus(status)
    setApiUrl(apiUrl)
  }, [props, isOpen])

  return (
    <>
      <Button onClick={handleModel} className={clsx(classes.themeButton, classes.noTextTransform)}>Change Status</Button>
      {isOpen &&
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          maxWidth='sm'
          aria-labelledby='dialog-title'
          open={isOpen}
        >
          <DialogTitle id='dialog-title' onClose={handleModel}>Change Status</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={CcpaStatus}
                  value={CcpaStatus.find((data: any) => data.id == status) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == status}
                  onChange={(event: any, newValue: any) => {
                    setStatus(newValue?.id || '');
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Change Status'
                      variant='outlined'
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleModel} variant='outlined' color='secondary'>Cancel</Button>
            <Button className={classes.themeButton} onClick={() => onSubmit()} variant='outlined'>
              {submitting ? <CircularProgress size={24} className={classes.lColor} /> : 'Change'}
            </Button>
          </DialogActions>

        </Dialog>
      }
    </>
  )
}

export default AppUserCCPA;

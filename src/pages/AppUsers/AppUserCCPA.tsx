import {
  Card, Table, TableBody, TableCell, TextField,
  TableHead, TableRow, Typography, Button,
  Dialog, DialogActions, DialogContent, Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import React, { useEffect, useState } from 'react';
import { CcpaStatus } from '../../utils/PlanDropdowns';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme: any) => ({
  marginTop10: {
    marginTop: 10
  },
  themeButton: {
    color: theme.palette.white,

    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
}));

const AppUserCCPA = (props: any) => {
  const classes = useStyles();

  const { data } = props;
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    setFormData(data)
  }, [props]);

  console.log(formData)

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
                  <TableCell>Pending</TableCell>
                  <TableCell><Button className={classes.themeButton}>Change Status</Button> </TableCell>
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
                  <TableCell>Pending</TableCell>
                  <TableCell><Button className={classes.themeButton}>Change Status</Button> </TableCell>
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
                  <TableCell>Pending</TableCell>
                  <TableCell><ChangeStatusModel /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      }
    </div>
  );
};


export const ChangeStatusModel = () =>{
  const classes = useStyles();
  const [modelOpen, setModelOpen] = React.useState(false);

  const handlestatusModel = () =>{
    setModelOpen(!modelOpen);
  }
  return (
    <>
      <Button onClick={handlestatusModel} className={classes.themeButton}>Change Status</Button> 
      <Dialog
         disableBackdropClick
         disableEscapeKeyDown
         fullWidth
         maxWidth='sm'
         aria-labelledby='dialog-title'
         open={modelOpen}
      >
          <DialogTitle id='dialog-title' onClose={handlestatusModel}>
            {'Change Status'}
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={CcpaStatus}
                  getOptionLabel={(option: any) => option.name}
                  // onChange={(event: any, newValue: any) => {
                  //   setFieldValue('fitnessGoal', newValue?.id || '');
                  // }}
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
            <Button onClick={handlestatusModel} variant='outlined' color='secondary'>
              Cancel
            </Button>

            <Button className={classes.themeButton} variant='outlined'>Change</Button>
          </DialogActions>

      </Dialog>
    </>
  )
}

export default AppUserCCPA;

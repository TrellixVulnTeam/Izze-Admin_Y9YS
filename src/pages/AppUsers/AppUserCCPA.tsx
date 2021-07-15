import {
  Card, Table, TableBody, TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: any) => ({
  marginTop10: {
    marginTop: 10
  }
}));

const AppUserCCPA = (props: any) => {
  const classes = useStyles();

  const { data } = props;
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
                </TableRow>
                <TableRow >
                  <TableCell>Email</TableCell>
                  <TableCell>{formData?.ccpa_access_data?.email}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>State</TableCell>
                  <TableCell>{formData?.ccpa_access_data?.state}</TableCell>
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
                </TableRow>
                <TableRow >
                  <TableCell>State</TableCell>
                  <TableCell>{formData?.ccpa_share_data?.state}</TableCell>
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
                </TableRow>
                <TableRow >
                  <TableCell>Email</TableCell>
                  <TableCell>{formData?.ccpa_delete_data?.email}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>State</TableCell>
                  <TableCell>{formData?.ccpa_delete_data?.state}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      }
    </div>
  );
};


export default AppUserCCPA;

import {
  Card, Table, TableBody, TableCell,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: any) => ({

}));

const AppUserDetails = (props: any) => {
  const classes = useStyles();

  const { data } = props;
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    setFormData(data)
  }, [props]);

  return (
    <Card>
      <Table>
        <TableBody>
          <TableRow >
            <TableCell>Name</TableCell>
            <TableCell>{formData?.firstName + ' ' + formData?.lastName}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Email</TableCell>
            <TableCell>{formData?.email}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Date of Birth</TableCell>
            <TableCell>{formData?.dateOfBirth}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Gender</TableCell>
            <TableCell>{formData?.gender}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Mobile Number</TableCell>
            <TableCell>{formData?.mobileNumber}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Country</TableCell>
            <TableCell>{formData?.country}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>State</TableCell>
            <TableCell>{formData?.state}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Experience Level </TableCell>
            <TableCell>{formData?.experience_level}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};


export default AppUserDetails;

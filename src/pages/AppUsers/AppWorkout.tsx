import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import clsx from 'clsx';
import * as Yup from 'yup';
import getDropValues, { CurrentClimateDrop, DietTypeDrop, ExperienceDrop, FitnessGoalDrop, getSubSkinIrregular, InterestsDrop, LifeStyleDrop, NoOption, PreferredDrop, SkinIrregularDrop, SkinTextureDrop, SkinTypeDrop } from '../../utils/PlanDropdowns';
import useSnackbar from '../../hook/useSnackbar';
import useService from '../../hook/useService';

const useStyles = makeStyles((theme: any) => ({
  editCardRoot: {
    padding: theme.spacing(2)
  },
  marginLeft1: {
    marginLeft: theme.spacing(1),
  },
  themeButton: {
    color: theme.palette.white,

    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  actionGrid: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "flex-end"
  },
  editButtonDiv: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing(2)
  }
}));

const AppWorkout = (props: any) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false)
  const { data, onRefresh } = props;
  const [formData, setFormData] = useState<any>(data);
  useEffect(() => {
    setFormData(props.data)
  }, [props.data]);

  return (
    <>
      {!isEdit && <div className={classes.editButtonDiv}>
        <Button onClick={() => setIsEdit(true)} className={classes.themeButton} variant='outlined'>
          Edit
        </Button>
      </div>
      }
      {!isEdit && <ViewCard data={formData} />}
      {isEdit && <EditCard data={formData} onClose={() => setIsEdit(false)} onSuccess={() => onRefresh()} />}
    </>
  );
};

const EditCard = (props: any) => {
  const classes = useStyles();
  const { onClose, onSuccess } = props;
  const formikRef = useRef<any>(null);
  const Snackbar = useSnackbar();
  const { Post } = useService();

  const formInitialValue = {
    id: "",
    experience_level: "",
    preferred_workout: "",
    interests: ""
  }

  const [initialValue, setInitialValue] = useState<any>(formInitialValue);

  const onSubmit = (value: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);

    Post('app/updateWorkoutPlan', value)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onClose();
        onSuccess();
      })
      .catch((err: any) => {
        setSubmitting(false);
        Snackbar.show(err.message, 'error');
      });
  };

  useLayoutEffect(() => {
    const { _id, experience_level, preferred_workout, interests } = props.data
    setInitialValue((prevState: any) => ({ ...prevState, id: _id, experience_level, preferred_workout, interests }))
  }, [props.data]);

  return (
    <Card className={classes.editCardRoot}>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValue}
        validationSchema={
          Yup.object().shape({
            experience_level: Yup.string().trim().required('Experience level is required'),
            preferred_workout: Yup.string().trim().required('Preferred workout is required'),
            interests: Yup.string().trim().required('Interests is required'),
          })
        }
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm, isSubmitting }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={4}>

                <Autocomplete
                  options={ExperienceDrop}
                  value={ExperienceDrop.find((data: any) => data.id == values.experience_level) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.experience_level}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('experience_level', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Experience Level'
                      variant='outlined'
                      error={Boolean(touched.experience_level && errors.experience_level)}
                      helperText={touched.experience_level && errors.experience_level}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={PreferredDrop}
                  value={PreferredDrop.find((data: any) => data.id == values.preferred_workout) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.preferred_workout}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('preferred_workout', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Preferred Workout'
                      variant='outlined'
                      error={Boolean(touched.preferred_workout && errors.preferred_workout)}
                      helperText={touched.preferred_workout && errors.preferred_workout}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={InterestsDrop}
                  value={InterestsDrop.find((data: any) => data.id == values.interests) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.interests}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('interests', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Interests'
                      variant='outlined'
                      error={Boolean(touched.interests && errors.interests)}
                      helperText={touched.interests && errors.interests}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid className={classes.actionGrid} item xs={12}>
                <Button onClick={() => onClose()} variant='outlined' color='secondary'>
                  Cancel
                </Button>
                <Button
                  className={clsx(classes.themeButton, classes.marginLeft1)}
                  onClick={() => submitForm()}
                  disabled={isSubmitting}
                  variant='outlined'
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} style={{ color: 'white' }} />
                  ) : 'Update'}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Formik>
    </Card>
  );
};

const ViewCard = (props: any) => {
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
            <TableCell>Experience Level</TableCell>
            <TableCell>{getDropValues(ExperienceDrop, formData?.experience_level)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Preferred Workout</TableCell>
            <TableCell>{getDropValues(PreferredDrop, formData?.preferred_workout)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Interests</TableCell>
            <TableCell>{getDropValues(InterestsDrop, formData?.interests)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default AppWorkout;

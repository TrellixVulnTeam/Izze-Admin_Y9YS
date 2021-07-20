import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Button,
  Card, CircularProgress, Grid, Table, TableBody, TableCell,
  TableRow,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import clsx from 'clsx';
import * as Yup from 'yup';
import getDropValues, { DietTypeDrop, FitnessGoalDrop, FitnessGoalWomenDrop, LifeStyleDrop, NoOption } from '../../utils/PlanDropdowns';
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

const AppNutrition = (props: any) => {
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
    fitnessGoal: "",
    lifestyle: "",
    diet_type: "",
    weight: 0,
    weightUnit: "kgs",
    height: 0,
    heightUnit: "cm"
  }

  console.log(props.data)

  const [initialValue, setInitialValue] = useState<any>(formInitialValue);

  const onSubmit = (value: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);

    Post('app/updateMealPlan', value)
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
    const { _id, fitnessGoal, lifestyle, diet_type, weight, height } = props.data
    setInitialValue((prevState: any) => ({ ...prevState, id: _id, fitnessGoal, lifestyle, diet_type, weight, height }))
  }, [props.data]);


  return (
    <Card className={classes.editCardRoot}>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValue}
        validationSchema={
          Yup.object().shape({
            fitnessGoal: Yup.string().trim().required('Fitness goal is required'),
            lifestyle: Yup.string().trim().required('Life style is required'),
            diet_type: Yup.string().trim().required('Diet type is required'),
            weight: Yup.number().required('Weight is required'),
            weightUnit: Yup.string().trim().required('Weight unit is required'),
            height: Yup.number().required('Height is required'),
            heightUnit: Yup.string().trim().required('Height unit is required'),
          })
        }
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm, isSubmitting }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  options={props.data?.gender !== 'She/Her/Hers' ? FitnessGoalDrop : FitnessGoalWomenDrop}
                  value={FitnessGoalDrop.find((data: any) => data.id == values.fitnessGoal) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.fitnessGoal}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('fitnessGoal', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Fitness goals'
                      variant='outlined'
                      error={Boolean(touched.fitnessGoal && errors.fitnessGoal)}
                      helperText={touched.fitnessGoal && errors.fitnessGoal}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={LifeStyleDrop}
                  value={LifeStyleDrop.find((data: any) => data.id == values.lifestyle) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.lifestyle}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('lifestyle', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Life style'
                      variant='outlined'
                      error={Boolean(touched.lifestyle && errors.lifestyle)}
                      helperText={touched.lifestyle && errors.lifestyle}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={DietTypeDrop}
                  value={DietTypeDrop.find((data: any) => data.id == values.diet_type) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.diet_type}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('diet_type', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Diet Types'
                      variant='outlined'
                      error={Boolean(touched.diet_type && errors.diet_type)}
                      helperText={touched.diet_type && errors.diet_type}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Weight'
                  name='weight'
                  variant='outlined'
                  error={Boolean(touched.weight && errors.weight)}
                  helperText={touched.weight && errors.weight}
                  value={values?.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment: values?.weightUnit
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Height'
                  name='height'
                  variant='outlined'
                  error={Boolean(touched.height && errors.height)}
                  helperText={touched.height && errors.height}
                  value={values?.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment: values?.heightUnit
                  }}
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
            <TableCell>Fitness Goals</TableCell>
            <TableCell>{getDropValues(FitnessGoalDrop, formData?.fitnessGoal)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Life Style</TableCell>
            <TableCell>{getDropValues(LifeStyleDrop, formData?.lifestyle)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Diet Type</TableCell>
            <TableCell>{getDropValues(DietTypeDrop, formData?.diet_type)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Height</TableCell>
            <TableCell>{formData?.height !== null ? formData?.height : '' + ' ' + formData?.heightUnit !== null ? formData?.heightUnit : ''}</TableCell>
            {/* <TableCell>{formData?.height + ' ' + formData?.heightUnit}</TableCell> */}
          </TableRow>
          <TableRow >
            <TableCell>Weight</TableCell>
            <TableCell>{formData?.weight !== null ? formData?.weight : '' + ' ' + formData?.weightUnit !== null ? formData?.weightUnit : ''}</TableCell>
            {/* <TableCell>{formData?.weight + ' ' + formData?.weightUnit}</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};


export default AppNutrition;

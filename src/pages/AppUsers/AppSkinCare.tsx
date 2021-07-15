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
import getDropValues, { CurrentClimateDrop, DietTypeDrop, FitnessGoalDrop, getSubSkinIrregular, LifeStyleDrop, NoOption, SkinIrregularDrop, SkinTextureDrop, SkinTypeDrop } from '../../utils/PlanDropdowns';
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
    skin_type: "",
    current_climate: "",
    skin_irregular: "",
    skin_irregular_sub: "",
    skin_texture: "",

  }

  const [initialValue, setInitialValue] = useState<any>(formInitialValue);

  const onSubmit = (value: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);

    Post('app/updateSkincarePlan', value)
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
    const { _id, skin_type, current_climate, skin_irregular, skin_irregular_sub, skin_texture } = props.data
    setInitialValue((prevState: any) => ({ ...prevState, id: _id, skin_type, current_climate, skin_irregular, skin_irregular_sub, skin_texture }))
  }, [props.data]);

  return (
    <Card className={classes.editCardRoot}>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValue}
        validationSchema={
          Yup.object().shape({
            skin_type: Yup.string().trim().required('Skin Type is required'),
            current_climate: Yup.string().trim().required('Current Climate is required'),
            skin_irregular: Yup.string().trim().required('Skin Irregularites is required'),
            skin_irregular_sub: Yup.string().trim().required('Sub Skin Irregularites is required'),
            skin_texture: Yup.string().trim().required('Skin Texture is required'),
          })
        }
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm, isSubmitting }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={4}>

                <Autocomplete
                  options={SkinTypeDrop}
                  value={SkinTypeDrop.find((data: any) => data.id == values.skin_type) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.skin_type}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('skin_type', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Skin Type'
                      variant='outlined'
                      error={Boolean(touched.skin_type && errors.skin_type)}
                      helperText={touched.skin_type && errors.skin_type}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={CurrentClimateDrop}
                  value={CurrentClimateDrop.find((data: any) => data.id == values.current_climate) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.current_climate}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('current_climate', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Current Climate'
                      variant='outlined'
                      error={Boolean(touched.current_climate && errors.current_climate)}
                      helperText={touched.current_climate && errors.current_climate}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={SkinTextureDrop}
                  value={SkinTextureDrop.find((data: any) => data.id == values.skin_texture) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.skin_texture}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('skin_texture', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Skin Texture'
                      variant='outlined'
                      error={Boolean(touched.skin_texture && errors.skin_texture)}
                      helperText={touched.skin_texture && errors.skin_texture}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  options={SkinIrregularDrop}
                  value={SkinIrregularDrop.find((data: any) => data.id == values.skin_irregular) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.skin_irregular}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('skin_irregular', newValue?.id || '');
                    setFieldValue('skin_irregular_sub', '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Skin Irregularites'
                      variant='outlined'
                      error={Boolean(touched.skin_irregular && errors.skin_irregular)}
                      helperText={touched.skin_irregular && errors.skin_irregular}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  options={getSubSkinIrregular(values.skin_irregular)}
                  value={getSubSkinIrregular(values.skin_irregular).find((data: any) => data.id == values.skin_irregular_sub) || NoOption}
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option) => option.id == values.skin_irregular_sub}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue('skin_irregular_sub', newValue?.id || '');
                  }}
                  onBlur={handleBlur}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label='Sub Skin Irregularites'
                      variant='outlined'
                      error={Boolean(touched.skin_irregular_sub && errors.skin_irregular_sub)}
                      helperText={touched.skin_irregular_sub && errors.skin_irregular_sub}
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
            <TableCell>Skin Type</TableCell>
            <TableCell>{getDropValues(SkinTypeDrop, formData?.skin_type)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Current Climate</TableCell>
            <TableCell>{getDropValues(CurrentClimateDrop, formData?.current_climate)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Skin Irregularities</TableCell>
            <TableCell>{getDropValues(SkinIrregularDrop, formData?.skin_irregular)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Sub Skin Irregularities</TableCell>
            <TableCell>{getDropValues(getSubSkinIrregular(formData?.skin_irregular), formData?.skin_irregular_sub)}</TableCell>
          </TableRow>
          <TableRow >
            <TableCell>Skin Texture</TableCell>
            <TableCell>{getDropValues(SkinTextureDrop, formData?.skin_texture)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};


export default AppNutrition;

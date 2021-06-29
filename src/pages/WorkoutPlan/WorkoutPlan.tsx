import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination, TabContext, TabList, TabPanel } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';


const useStyles = makeStyles((theme: any) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  themeButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  dayPaper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.green.main,
    color: 'white',
  },
  lColor: {
    color: 'white',
  },
  tabCard: {
    marginTop: theme.spacing(3),
  },
  content: {
    padding: 0,
  },
  mTop: {
    marginTop: theme.spacing(1.5),
  },
  jCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  sEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  sBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconPadd: {
    padding: 5,
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
  ingredientsAvatarStyle: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
    marginTop: '20px',
  },
  //
  tabRoot: {
    minWidth: 72,
  },
  tabIndicator: {
    backgroundColor: theme.palette.green.main,
  },
  tabTextColorInherit: {
    backgroundColor: theme.palette.green.main,
    color: 'white',
    border: '1px solid white'
  },
  tabPanelRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%'
  },
  listItemRoot: {
    backgroundColor: '#7ac0af2b',
    margin: '10px 0px'
  },
  noListItemRoot: {
    backgroundColor: '#f500571c',
    margin: '10px 0px'
  },
  paperRoot: {
    display: 'flex'
  },
}));

const ExperienceDrop = [
  { id: 'BEGINNER', name: 'Beginner' },
  { id: 'INTERMEDIATE', name: 'Intermediate' },
  { id: 'PROFESSIONAL', name: 'Professional' },
];

const PreferredDrop = [
  { id: 'STRENGTH', name: 'Strength Training' },
  { id: 'HIIT', name: 'HIIT' },
];

const InterestsDrop = [
  { id: 'HOME', name: 'Home Workout' },
  { id: 'GYM', name: 'Gym Workout' },
];

const WorkoutPlan = () => {
  const classes = useStyles();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const [isLoading, setIsLoading] = React.useState(true);
  const [stateData, setStateData] = React.useState({
    page_no: 1,
    page_limit: 10,
  });
  const [pageCount, setPageCount] = React.useState(0);
  const [tableData, setTableData] = React.useState([]);
  const [addEditDialog, setAddEditDialog] = React.useState({
    isOpen: false,
    title: '',
    okBtnText: '',
    isEdit: false,
    data: {},
  });
  const [viewDialog, setViewDialog] = useState({
    isOpen: false,
    title: '',
    data: {},
  });

  const listWorkoutPlan = () => {
    setIsLoading(true);
    Post('app/listWorkoutPlan', stateData)
      .then((res: any) => {
        setIsLoading(false);
        if (!res.error) {
          setPageCount(res.page_count);
          setTableData(res.data);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        Snackbar.show(error.message, 'error');
      });
  };

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Workout Plan',
      isEdit: false,
      okBtnText: 'Save',
    }));
  };

  const openEditDialog = (data: any) => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      isEdit: true,
      data,
      title: 'Edit Workout Plan',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Workout Plan',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteWorkoutPlan', { id: data._id })
        .then(async (res: any) => {
          setLoading(false);
          closeModel();
          onSuccessAction();
          Snackbar.show(res.message, 'success');
        })
        .catch((err: any) => {
          setLoading(false);
          Snackbar.show('Internal Server Error', 'error');
        });
    };
    openModel(submitFunction);
  };

  const onSuccessAction = () => {
    listWorkoutPlan();
    closeAddEditDialog();
  };

  const closeAddEditDialog = () => {
    setAddEditDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const closeViewDialog = () => {
    setViewDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
  };

  useEffect(() => {
    listWorkoutPlan();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Workout Plan' />

      {/* =======Header====== */}
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Workout Plan
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            onClick={() => openAddDialog()}
            className={classes.themeButton}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      {/* =============Search======== */}
      <Grid container spacing={3}>
        <Grid item>
          <Paper elevation={0}>
            <TextField
              fullWidth
              size='small'
              placeholder='Name'
              variant='outlined'
              name='state'
            />
          </Paper>
        </Grid>
      </Grid>

      {/* ========Table With Pagination========= */}
      <Card className={classes.tabCard}>
        <CardContent className={classes.content}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='center'>Experience Level</TableCell>
                  <TableCell align='center'>Preferred Workout</TableCell>
                  <TableCell align='center'>Interests</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  tableData.map((data: any, index: any) => {
                    return (
                      <TableRow hover>
                        <TableCell align='center'>{stateData.page_limit * (stateData.page_no - 1) + index + 1}</TableCell>
                        <TableCell align='center'>{getDropValues(ExperienceDrop, data?.experience_level)}</TableCell>
                        <TableCell align='center'>{getDropValues(PreferredDrop, data?.preferred_workout)}</TableCell>
                        <TableCell align='center'>{getDropValues(InterestsDrop, data?.interests)}</TableCell>
                        <TableCell align='center'>
                          <div className={classes.sEvenly}>
                            <Tooltip title='View' arrow>
                              <IconButton
                                className={classes.iconPadd}
                                onClick={() => openViewDialog(data)}
                              >
                                <CenterFocusStrongIcon color='primary' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Edit' arrow>
                              <IconButton
                                className={classes.iconPadd}
                                onClick={() => openEditDialog(data)}
                              >
                                <EditIcon color='action' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete' arrow>
                              <IconButton
                                className={classes.iconPadd}
                                onClick={() => onDelete(data)}
                              >
                                <DeleteIcon color='secondary' />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {isLoading && <TableLoader />}
                {!isLoading && tableData.length == 0 && (
                  <TableNoData>No Data Found</TableNoData>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <CardActions className={classes.actions}>
          <Pagination
            count={pageCount}
            page={stateData.page_no}
            onChange={onPageChange}
          />
        </CardActions>
      </Card>

      {/* ==========Add & Edit Dialoge======== */}

      <AddEditDialog
        {...addEditDialog}
        onClose={closeAddEditDialog}
        onSuccess={onSuccessAction}
      />
      {viewDialog.isOpen && <ViewWorkoutPlan {...viewDialog} onClose={closeViewDialog} />}
    </div>
  );
}

interface WorkoutMain {
  before_workout: WorkoutSub[];
  workout: WorkoutSub[];
  after_workout: WorkoutSub[];
  day: number;
}

interface WorkoutSub {
  id: string;
}

interface WorkoutPlan {
  experience_level: string;
  preferred_workout: string;
  interests: string;
  workouts: WorkoutMain[];
}

const AddEditDialog = (props: any) => {

  const {
    isEdit,
    isOpen,
    okBtnText = 'OK',
    onClose,
    data,
    title,
    onSuccess,
  } = props;
  const classes = useStyles();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const formikRef = useRef<any>(null);
  const [workoutList, setWorkoutList] = React.useState<any>([]);

  const workoutInitalValue = {
    before_workout: [],
    workout: [],
    after_workout: [],
  }

  const initialFormValues: WorkoutPlan = {
    experience_level: '',
    preferred_workout: '',
    interests: '',
    workouts: Array(7).fill(null).map((d, i) => ({ day: i + 1, ...workoutInitalValue })),
  };


  const [initialValue, setInitialValue] = React.useState({
    ...initialFormValues,
  });

  const listAllWorkout = () => {
    Post('app/listAllWorkout', {})
      .then((response: any) => {
        if (!response.error) {
          setWorkoutList(response.data);
        } else {
          Snackbar.show(response.message, 'error');
        }
      })
      .catch((error: any) => {
        Snackbar.show(error.message, 'error');
      });
  };

  const onSubmit = (value: any, helper: any) => {
    helper.setSubmitting(true);
    !isEdit && addData(value, helper);
    isEdit && editData(value, helper);
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addWorkoutPlan', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        const { message = "Internal Server Error" } = err.response.data
        setSubmitting(false);
        Snackbar.show(message, 'error');
      });
  };

  const editData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/editWorkoutPlan', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        const { message = "Internal Server Error" } = err.response.data
        setSubmitting(false);
        Snackbar.show(message, 'error');
      });
  };

  useEffect(() => {
    if (isEdit) {
      const { workouts, _id, ...rest } = data;
      const editData = { ...rest, id: _id };
      const CurrentWorkoutIds = workoutList.map(({ _id }: any) => _id)
      editData.workouts = workouts.map((data: any) => {
        data.before_workout = data.before_workout.filter(({ _id }: any) => CurrentWorkoutIds.includes(_id)).map(({ _id }: any) => ({ id: _id }));
        data.workout = data.workout.filter(({ _id }: any) => CurrentWorkoutIds.includes(_id)).map(({ _id }: any) => ({ id: _id }));
        data.after_workout = data.after_workout.filter(({ _id }: any) => CurrentWorkoutIds.includes(_id)).map(({ _id }: any) => ({ id: _id }));
        return data;
      });
      console.log('editData', editData)
      setInitialValue(editData);
    } else {
      setInitialValue(initialFormValues);
    }
  }, [props, workoutList]);

  useEffect(() => {
    listAllWorkout();
  }, []);

  return (
    <div>
      <Dialog
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth='lg'
        aria-labelledby='dialog-title'
      >
        <DialogTitle id='dialog-title' onClose={onClose}>
          {title}
        </DialogTitle>
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            experience_level: Yup.string().trim().required('Experience Level is required'),
            preferred_workout: Yup.string().trim().required('Preferred Workout is required'),
            interests: Yup.string().trim().nullable().required('Interests is required'),
            workouts: Yup.array().of(
              Yup.object().shape({
                before_workout: Yup.array().of(
                  Yup.object().shape({
                    id: Yup.string().trim().required('Before Workout is Required'),
                  })),
                workout: Yup.array().of(
                  Yup.object().shape({
                    id: Yup.string().trim().required('Workout is Required'),
                  })),
                after_workout: Yup.array().of(
                  Yup.object().shape({
                    id: Yup.string().trim().required('After Workout is Required'),
                  })),
                day: Yup.string().trim().required('Day is Required'),
              }))
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            submitForm,
            isSubmitting,
          }) => (
            <>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={4}>
                    <Autocomplete
                      options={ExperienceDrop}
                      value={ExperienceDrop.find((data: any) => data.id == values.experience_level)}
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

                  <Grid item md={4} xs={4}>
                    <Autocomplete
                      options={PreferredDrop}
                      value={PreferredDrop.find((data: any) => data.id == values.preferred_workout)}
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
                  <Grid item md={4} xs={4}>
                    <Autocomplete
                      options={InterestsDrop}
                      value={InterestsDrop.find((data: any) => data.id == values.interests)}
                      getOptionLabel={(option: any) => option.name}
                      getOptionSelected={(option) => option.id == values.interests}
                      onChange={(event: any, newValue: any) => {
                        setFieldValue('interests', newValue?.id || null);
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
                  {values.workouts.map((worData: any, i: any) => {
                    return (
                      <>
                        <Grid md={1} item xs={1}>
                          <Paper
                            elevation={0}
                            component='div'
                            className={classes.dayPaper}
                          >
                            <Typography color='inherit' align='center'>{`Day - ${worData.day}`}</Typography>
                          </Paper>
                        </Grid>

                        <Grid item md={3} xs={3}>
                          <Autocomplete
                            multiple
                            options={workoutList}
                            value={workoutList.filter((data: any) => worData.before_workout.map(({ id }: any) => id).includes(data._id))}
                            getOptionLabel={(option: any) => option.workout_name}
                            onChange={(event: any, newValue: any) => {
                              let WorkoutIds = newValue.map(({ _id }: any) => ({ id: _id }))
                              setFieldValue(`workouts[${i}].before_workout`, WorkoutIds || []);
                            }}
                            onBlur={handleBlur}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                label='Before Workout'
                                variant='outlined'
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={4} xs={4}>
                          <Autocomplete
                            multiple
                            options={workoutList}
                            value={workoutList.filter((data: any) => worData.workout.map(({ id }: any) => id).includes(data._id))}
                            getOptionLabel={(option: any) => option.workout_name}
                            onChange={(event: any, newValue: any) => {
                              let WorkoutIds = newValue.map(({ _id }: any) => ({ id: _id }))
                              setFieldValue(`workouts[${i}].workout`, WorkoutIds || []);
                            }}
                            onBlur={handleBlur}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                label='Workout'
                                variant='outlined'
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item md={4} xs={4}>
                          <Autocomplete
                            multiple
                            options={workoutList}
                            value={workoutList.filter((data: any) => worData.after_workout.map(({ id }: any) => id).includes(data._id))}
                            getOptionLabel={(option: any) => option.workout_name}
                            onChange={(event: any, newValue: any) => {
                              let WorkoutIds = newValue.map(({ _id }: any) => ({ id: _id }))
                              setFieldValue(`workouts[${i}].after_workout`, WorkoutIds || []);
                            }}
                            onBlur={handleBlur}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                label='After Workout'
                                variant='outlined'
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={onClose} variant='outlined' color='secondary'>
                  Cancel
                </Button>

                <Button
                  className={classes.themeButton}
                  onClick={() => submitForm()}
                  disabled={isSubmitting}
                  variant='outlined'
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} className={classes.lColor} />
                  ) : (
                    okBtnText
                  )}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div >
  );
};

const ViewWorkoutPlan = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
  };

  useEffect(() => {
    console.log('view data', data)
    setFormValue(data);
  }, [props]);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth='md'
      aria-labelledby='dialog-view-title'
      open={isOpen}
    >
      <DialogTitle id='dialog-view-title' onClose={onClose}>
        {title}
      </DialogTitle>

      <DialogContent dividers>
        <Paper >
          <Table>
            <TableBody>
              <TableRow >
                <TableCell>Experience Level</TableCell>
                <TableCell><strong>{getDropValues(ExperienceDrop, formValue?.experience_level)}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Preferred Workout</TableCell>
                <TableCell><strong>{getDropValues(PreferredDrop, formValue?.preferred_workout)}</strong></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Interests</TableCell>
                <TableCell><strong>{getDropValues(InterestsDrop, formValue?.interests)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Paper className={classes.paperRoot}>
          <TabContext value={value || ''}>
            <TabList
              classes={{
                indicator: classes.tabIndicator
              }}
              onChange={handleChange}
              orientation="vertical"
              variant="standard"
            >
              {formValue?.workouts.map((item: any) =>
                <Tab
                  classes={{ root: classes.tabRoot, textColorInherit: classes.tabTextColorInherit }}
                  label={`Day - ${item.day}`}
                  value={item.day.toString()} />
              )}
            </TabList>

            {formValue?.workouts.map((item: any) =>
              <TabPanel className={classes.tabPanelRoot} value={item.day.toString()}>
                <List>
                  <div>Before Workout</div>
                  {item?.before_workout.map((data: any) => <WorkoutListItem data={data} />)}
                  {item?.before_workout?.length == 0 && <NoWorkoutListItem />}
                  <div>Workout</div>
                  {item?.workout.map((data: any) => <WorkoutListItem data={data} />)}
                  {item?.workout?.length == 0 && <NoWorkoutListItem />}
                  <div>After Workout</div>
                  {item?.after_workout.map((data: any) => <WorkoutListItem data={data} />)}
                  {item?.after_workout?.length == 0 && <NoWorkoutListItem />}
                </List>
              </TabPanel>)}
          </TabContext>
        </Paper>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const WorkoutListItem = (props: any) => {
  const classes = useStyles()
  const [listData, setListData] = useState(props.data)
  useEffect(() => {
    setListData(props.data)
  }, [props.data])
  return (
    <ListItem className={classes.listItemRoot}>
      <ListItemAvatar>
        <Avatar variant='square' src={listData?.workout_image} />
      </ListItemAvatar>
      <ListItemText
        primary={listData?.workout_name}
      />
    </ListItem>
  )
}

const NoWorkoutListItem = (props: any) => {
  const classes = useStyles()
  return (
    <ListItem className={classes.noListItemRoot}>
      <ListItemText
        primary={'No Workout'}
      />
    </ListItem>
  )
}

export default WorkoutPlan;

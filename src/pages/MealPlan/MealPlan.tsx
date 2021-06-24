import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import CheckIcon from '@material-ui/icons/Check';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination, TabContext, TabList, TabPanel } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik, getIn, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import { initialFormValues, MealTime, validation } from './FormikValues';
import clsx from 'clsx'

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  content: {
    padding: 0,
  },
  tabCard: {
    marginTop: theme.spacing(3),
  },
  themeButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
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
  jCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
  tabRoot: {
    minWidth: 0,
    textTransform: 'none'
    // margin: '10px 0px',
  },
  tabIndicator: {
    backgroundColor: theme.palette.green.main,
  },
  tabTextColorInherit: {
    backgroundColor: theme.palette.green.main,
    color: 'white',
    border: '1px solid white',
  },
  tabPanelRoot: {
    padding: 0,
    // paddingBottom: 0,
    width: '100%',
  },
  listItemRoot: {
    backgroundColor: '#7ac0af2b',
    margin: '10px 0px',
  },
  flexDisplay: {
    display: 'flex',
  },
  paperRoot: {
    display: 'flex',
    marginTop: '20px',
  },
  paperRoot1: {
    display: 'flex',
    marginTop: '20px',
  },
  tablePanelRoot: {
    padding: '0px',
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  justPadding: {
    padding: 10,
    borderRadius: 10
  },
  tabBtnIcon: {
    height: '100%',
    minWidth: 0,
    textTransform: 'none'
  },
  divTab: {
    flexDirection: 'column',
    display: 'flex'
  },
  cardRoot: {
    borderRadius: theme.spacing(3),
    position: 'relative'
  },
  cardMediaRoot: {
    height: theme.spacing(25)
  },
  cardContentRoot: {
    backgroundColor: '#EFF1F3',
    padding: theme.spacing(2),
    paddingBottom: `${theme.spacing(2)}px !important`
  },
  cardActionsRoot: {
    padding: 0,
    paddingTop: theme.spacing(1)
  },
  ulRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  liRoot: {
    paddingLeft: '1em',
    textIndent: '-.7em',
  },
  colorProtein: {
    '&::before': {
      content: "'•  '",
      color: '#9A88FF',
    }
  },
  colorFat: {
    '&::before': {
      content: "'•  '",
      color: '#E57B91',
    }
  },
  colorCarbs: {
    '&::before': {
      content: "'•  '",
      color: '',
    }
  },
  dividerRoot: {
    background: ' #474749 0% 0% no-repeat padding-box',
    opacity: '0.25',
    height: theme.spacing(3)
  },
  mealTimeText: {
    margin: theme.spacing(2, 0)
  },
  nutritionTextDiv: {
    border: '1px solid #EFF1F3',
    color: '#EFF1F3',
    borderRadius: 20,
    padding: theme.spacing(0.5, 1),
    width: 'fit-content',
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  nutritionText: {
    fontSize: '0.5rem',
  }
}));

const DietTypeDrop = [
  { id: 'VEG', name: 'Vegetarian' },
  { id: 'NONVEG', name: 'Non-Vegetarian' },
  { id: 'EGG', name: 'Eggetarian' },
];

const CaloriesDrop = [
  { id: '2000', name: '2000' },
  { id: '2100', name: '2100' },
  { id: '2200', name: '2200' },
  { id: '2300', name: '2300' },
];

const MealPlan = () => {
  const classes = useStyles();
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const ConfModel = useConfModel();
  const [loading, setLoading] = useState(true);
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [mealPlanList, setMealPlanList] = useState([]);
  const [addEditDialog, setAddEditDialog] = useState({
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

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Meal Plan',
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
      title: 'Edit Meal Plan',
      okBtnText: 'Edit',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteMealPlan', { id: data._id })
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

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Meal Plan',
    }));
  };

  const listMealPlan = async () => {
    setLoading(true);
    Post('app/listMealPlan', stateData)
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setMealPlanList(res.data);
          setPageCount(res.page_count);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        setLoading(false);
        Snackbar.show(err.message, 'error');
      });
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
  };

  const closeAddEditDialog = () => {
    setAddEditDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const closeViewDialog = () => {
    setViewDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const onSuccessAction = () => {
    listMealPlan();
    closeAddEditDialog();
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
  };

  useEffect(() => {
    listMealPlan();
  }, []);

  return (
    <div className={classes.root}>
      <Page title='Meal Plan' />

      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Meal Plan
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

      <Card className={classes.tabCard}>
        <CardContent className={classes.content}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='center'>Diet Type</TableCell>
                  <TableCell align='center'>Calories</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  mealPlanList.map((data: any, index: number) => (
                    <TableRow hover key={index}>
                      <TableCell align='center'>
                        {stateData.page_limit * (stateData.page_no - 1) +
                          index +
                          1}
                      </TableCell>
                      <TableCell align='center'>{getDropValues(DietTypeDrop, data?.diet_type)}</TableCell>
                      <TableCell align='center'>{data?.calories}</TableCell>
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
                  ))}
                {loading && <TableLoader />}
                {!loading && mealPlanList.length == 0 && (
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

      {addEditDialog.isOpen && <AddEditModel {...addEditDialog} onClose={closeAddEditDialog} onSuccess={onSuccessAction} />}
      {viewDialog.isOpen && <ViewModel {...viewDialog} onClose={closeViewDialog} />}
    </div>
  );
}

export const AddEditModel = (props: any) => {
  const {
    isEdit,
    isOpen,
    okBtnText = 'OK',
    onClose,
    data,
    title,
    onSuccess,
  } = props;
  const formikRef = useRef<any>(null);
  const classes = useStyles();
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const [tabValue, setTabValue] = useState('0');
  const [recipeList, setRecipeList] = useState([])


  const [initialValue, setInitialValue] = useState({
    ...initialFormValues,
  });

  const onSubmit = (value: any, helper: any) => {
    helper.setSubmitting(true);
    const postData = { ...value };
    !isEdit && addData(postData, helper);
    isEdit && editData(postData, helper);
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addMealPlan', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        setSubmitting(false);
        Snackbar.show(err.message, 'error');
      });
  };

  const editData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/editMealPlan', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        setSubmitting(false);
        Snackbar.show(err.message, 'error');
      });
  };



  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue);
  };





  const listAllMealRecipe = () => {
    Post('app/listAllMealRecipe', {})
      .then((response: any) => {
        if (!response.error) {
          setRecipeList(response.data);
        } else {
          Snackbar.show(response.message, 'error');
        }
      })
      .catch((error: any) => {
        Snackbar.show(error.message, 'error');
      });
  };



  useEffect(() => {
    if (isEdit) {
      const { _id, ...rest } = data;
      const editData = { ...rest, id: _id };

      let mealDays = editData.meal_days.map((MealDays: any) => {
        const { meals, ...rest } = MealDays
        let NewMeals = meals.map((MealData: any) => {
          const { recipe, ...rest } = MealData
          const RecipeIds = recipeList.map(({ _id }: any) => _id)
          const NewRecipe = recipe.filter(({ _id }: any) => RecipeIds.includes(_id)).map(({ _id }: any) => ({ id: _id }));
          return { ...rest, isEdit: false, recipe: NewRecipe }
        })
        return { ...rest, meals: NewMeals }
      })
      editData.meal_days = mealDays
      console.log('editData', editData)
      setInitialValue(editData);
    } else {
      setInitialValue(initialFormValues);
    }
  }, [props, recipeList]);

  useEffect(() => {
    listAllMealRecipe();
  }, []);

  return (
    <>
      <Dialog
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        fullScreen
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
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm, isSubmitting }) => (
            <>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={DietTypeDrop}
                      value={DietTypeDrop.find((data: any) => data.id == values.diet_type)}
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
                    <Autocomplete
                      options={CaloriesDrop}
                      value={CaloriesDrop.find((data: any) => data.id == values.calories)}
                      getOptionLabel={(option: any) => option.name}
                      getOptionSelected={(option) => option.id == values.calories}
                      onChange={(event: any, newValue: any) => {
                        setFieldValue('calories', newValue?.id || '');
                      }}
                      onBlur={handleBlur}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label='Calories'
                          variant='outlined'
                          error={Boolean(touched.calories && errors.calories)}
                          helperText={touched.calories && errors.calories}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* <Paper className={classes.paperRoot}> */}

                  <TabContext value={tabValue || ''}>
                    <Grid item xs={2}>
                      <TabList
                        classes={{
                          indicator: classes.tabIndicator
                        }}
                        onChange={(e, value) => handleChangeTab(value)}
                        orientation="vertical"
                        variant="standard"
                      >
                        {values?.meal_days.map((mealDay: any, i: number) => {
                          const { day } = mealDay
                          return (
                            <Tab
                              classes={{ root: classes.tabRoot, textColorInherit: classes.tabTextColorInherit }}
                              label={`Day - ${day}`}
                              value={day.toString()} />
                          )
                        }
                        )}

                      </TabList>
                    </Grid>

                    <Grid item xs={10}>
                      {values?.meal_days.map((mealDay: any, i: number) => {
                        const { day, meals } = mealDay
                        return (
                          <TabPanel key={i} className={classes.tabPanelRoot} value={day.toString()}>
                            <MealTab key={i} index={i} meals={meals} recipeList={recipeList} />
                          </TabPanel>
                        )
                      })}
                    </Grid>

                  </TabContext>
                  {/* </Paper> */}

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
                    <CircularProgress size={24} style={{ color: 'white' }} />
                  ) : (
                    okBtnText
                  )}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

const ViewModel = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);
  const [tabValue, setTabValue] = useState<any>('1');

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
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
                <TableCell>Diet Type</TableCell>
                <TableCell><strong>{getDropValues(DietTypeDrop, formValue?.diet_type)}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Calories</TableCell>
                <TableCell><strong>{formValue?.calories}</strong></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>

        <Paper>
          <TabContext value={tabValue || ''}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={2}>
                <TabList
                  classes={{
                    indicator: classes.tabIndicator
                  }}
                  onChange={handleTabChange}
                  orientation="vertical"
                  variant="standard"
                >
                  {formValue?.meal_days.map((mealDay: any, i: number) => {
                    const { day } = mealDay
                    return (
                      <Tab
                        classes={{ root: classes.tabRoot, textColorInherit: classes.tabTextColorInherit }}
                        label={`Day - ${day}`}
                        value={day.toString()} />
                    )
                  }
                  )}

                </TabList>
              </Grid>

              <Grid item xs={10}>
                {formValue?.meal_days.map((mealDay: any, i: number) => {
                  const { day, meals = [] } = mealDay
                  return (
                    <TabPanel key={i} className={classes.tabPanelRoot} value={day.toString()}>
                      {meals.map((mealData: any, i: number) => {
                        const { meal_time, recipe = [] } = mealData
                        return (
                          <>
                            <Grid item xs={12} className={classes.mealTimeText}>
                              <Typography variant='h5' >
                                <strong>{meal_time}</strong>
                              </Typography>
                            </Grid>

                            <Grid item container xs={12} spacing={2}>
                              {recipe.map((recData: any, i: number) => {
                                return (
                                  <Grid item xs={12} sm={12} md={6}>
                                    <Card elevation={0} className={classes.cardRoot}>
                                      {/* <CardActionArea> */}
                                      <CardMedia
                                        className={classes.cardMediaRoot}
                                        image={recData.image}
                                        title={recData.name}
                                      />

                                      <div className={classes.nutritionTextDiv}>
                                        <div className={classes.nutritionText}> {recData.nutrition}</div>
                                      </div>

                                      <CardContent className={classes.cardContentRoot}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                          {recData.name}
                                        </Typography>
                                        <CardActions disableSpacing className={classes.cardActionsRoot}>
                                          <div>
                                            <Typography variant="body2" >
                                              <ul className={classes.ulRoot}>
                                                <li className={clsx(classes.liRoot, classes.colorProtein)}>Protein</li>
                                              </ul>
                                            </Typography>
                                            <Typography variant="body1" >
                                              {recData.protein}
                                            </Typography>
                                          </div>
                                          <Divider className={classes.dividerRoot} orientation="vertical" variant='middle' />
                                          <div>
                                            <Typography variant="body2" >
                                              <ul className={classes.ulRoot}>
                                                <li className={clsx(classes.liRoot, classes.colorFat)}>Fat</li>
                                              </ul>
                                            </Typography>
                                            <Typography variant="body1" >
                                              {recData.fat}
                                            </Typography>
                                          </div>
                                          <Divider className={classes.dividerRoot} orientation="vertical" variant='middle' />
                                          <div>
                                            <Typography variant="body2" >
                                              <ul className={classes.ulRoot}>
                                                <li className={clsx(classes.liRoot, classes.colorCarbs)}>Carbs</li>
                                              </ul>
                                            </Typography>
                                            <Typography variant="body1" >
                                              {recData.carbs}
                                            </Typography>
                                          </div>
                                        </CardActions>
                                      </CardContent>

                                      {/* </CardActionArea> */}

                                    </Card>
                                  </Grid>
                                )
                              })}
                            </Grid>
                          </>
                        )
                      })}
                    </TabPanel>
                  )
                })}
              </Grid>
            </Grid>
          </TabContext>
        </Paper>


      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog >
  );
};

const MealTab = ({ meals, recipeList, index }: any) => {
  const { values, touched, errors, setFieldValue, handleChange, handleBlur } = useFormikContext()
  const classes = useStyles()
  const [tabValue, setTabValue] = useState('0');
  const FieldName = `meal_days[${index}]`

  const getArrayError = (error: any) => {
    return typeof error == 'string' ? error : ''
  }

  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue);
  };

  const addNewTab = (values: any, setFieldValue: any) => {
    const { meals } = getIn(values, FieldName)
    meals.push(MealTime)
    setFieldValue(`${FieldName}.meals`, meals)
  }

  const submitMealTime = (i: number, values: any, setFieldValue: any) => {
    const { meals } = getIn(values, FieldName)
    const NewMeals = { ...meals[i] }
    NewMeals.isEdit = false
    meals[i] = NewMeals
    setFieldValue(`${FieldName}.meals`, meals)
    handleChangeTab(i.toString())
  }

  const editMealTime = (i: number, values: any, setFieldValue: any) => {
    const { meals } = getIn(values, FieldName)
    const NewMeals = { ...meals[i] }
    NewMeals.isEdit = true
    meals[i] = NewMeals
    setFieldValue(`${FieldName}.meals`, meals)
    handleChangeTab(i.toString())
  }

  const deleteMealTime = (i: number, values: any, setFieldValue: any) => {
    const { meals } = getIn(values, FieldName)
    const NewMeals = meals.filter((d: any, index: number) => index != i)
    setFieldValue(`${FieldName}.meals`, NewMeals)
  }

  return (
    <TabContext value={tabValue || ''}>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          <TabList
            classes={{
              indicator: classes.tabIndicator
            }}
            orientation="vertical"
            variant="standard"
          >
            {meals.map((mealData: any, i: number) => {
              let FieldNameSub: any = `${FieldName}.meals[${i}]`
              let FieldTouched: any = getIn(touched, FieldNameSub)
              let FieldErrors: any = getIn(errors, FieldNameSub)
              let FieldValues: any = getIn(values, FieldNameSub)
              const TabSelected = i == Number(tabValue)
              const SelectedStyle = TabSelected ? { borderRight: '2px solid #41a58d' } : { borderRight: '2px solid white' }
              return (
                <div className={classes.divTab}>
                  <Grid item container xs={12} spacing={1} style={{ margin: 'inherit', ...SelectedStyle }}>
                    <Grid item xs={mealData.isEdit ? 10 : 8}>
                      {mealData.isEdit &&
                        <TextField
                          fullWidth
                          size='small'
                          label='Name'
                          name={`${FieldNameSub}.meal_time`}
                          variant='outlined'
                          error={Boolean(FieldTouched?.meal_time && FieldErrors?.meal_time)}
                          helperText={FieldTouched?.meal_time && FieldErrors?.meal_time}
                          value={mealData?.meal_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      }

                      {!mealData.isEdit &&
                        <Button
                          fullWidth
                          className={!Boolean(FieldTouched?.meal_time && FieldErrors?.meal_time) ? classes.themeButton : ''}
                          classes={{
                            fullWidth: classes.tabBtnIcon
                          }}
                          variant='contained'
                          color='secondary'
                          onClick={(e) => handleChangeTab(i.toString())}
                        >
                          {!Boolean(FieldTouched?.meal_time && FieldErrors?.meal_time) ? mealData?.meal_time : FieldErrors?.meal_time}
                        </Button>}
                    </Grid>

                    {mealData.isEdit &&
                      <Grid item xs={2}>
                        <Button
                          fullWidth
                          className={classes.themeButton}
                          classes={{
                            fullWidth: classes.tabBtnIcon
                          }}
                          variant='contained'
                          color='secondary'
                          onClick={() => submitMealTime(i, values, setFieldValue)}
                        >
                          <CheckIcon />
                        </Button>
                      </Grid>
                    }

                    {!mealData.isEdit && <Grid item xs={2} >
                      <Button
                        fullWidth
                        classes={{
                          fullWidth: classes.tabBtnIcon
                        }}
                        variant='contained'
                        color='primary'
                        onClick={() => editMealTime(i, values, setFieldValue)}
                      >
                        <EditIcon />
                      </Button>
                    </Grid>
                    }

                    {!mealData.isEdit &&
                      <Grid item xs={2}>
                        <Button
                          fullWidth
                          classes={{
                            fullWidth: classes.tabBtnIcon
                          }}
                          variant='contained'
                          color='secondary'
                          onClick={() => deleteMealTime(i, values, setFieldValue)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    }
                  </Grid>
                </div>
              )
            }
            )}

            <div className={classes.divTab}>
              <Grid container xs={12} spacing={1} style={{ margin: 'inherit' }}>
                <Grid item xs={12}>
                  <FormControl fullWidth
                    error={Boolean(getIn(touched, `${FieldName}.meals`) && getArrayError(getIn(errors, `${FieldName}.meals`)))}
                  >
                    <Button
                      fullWidth
                      className={classes.themeButton}
                      variant='contained'
                      color='secondary'
                      onClick={() => addNewTab(values, setFieldValue)}
                    >
                      <AddIcon />
                    </Button>

                    <FormHelperText>
                      {getIn(touched, 'nutrition') && getArrayError(getIn(errors, 'nutrition'))}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </TabList>
        </Grid>

        <Grid item xs={8}>
          {meals.map((mealData: any, i: number) => {
            let FieldNameSub: any = `${FieldName}.meals[${i}]`
            let FieldTouched: any = getIn(touched, FieldNameSub)
            let FieldErrors: any = getIn(errors, FieldNameSub)
            return (
              <TabPanel key={i} className={classes.tabPanelRoot} value={i.toString()}>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                      <strong>{mealData?.meal_time}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      multiple
                      options={recipeList}
                      value={recipeList.filter((data: any) => mealData.recipe.map(({ id }: any) => id).includes(data._id))}
                      getOptionLabel={(option: any) => option.name}
                      onChange={(event: any, newValue: any) => {
                        let RecIds = newValue.map(({ _id }: any) => ({ id: _id }))
                        setFieldValue(`${FieldNameSub}.recipe`, RecIds || []);
                      }}
                      onBlur={handleBlur}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label='Recipe'
                          variant='outlined'
                          error={Boolean(FieldTouched?.recipe && FieldErrors?.recipe)}
                          helperText={FieldTouched?.recipe && FieldErrors?.recipe}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

              </TabPanel>
            )
          }
          )}

        </Grid>

      </Grid>
    </TabContext >
  )
}

export default MealPlan;

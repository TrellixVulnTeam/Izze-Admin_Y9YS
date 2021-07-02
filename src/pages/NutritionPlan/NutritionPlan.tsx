import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  CircularProgressProps,
  Dialog,
  DialogActions,
  DialogContent, Divider, FormControl,
  FormHelperText, Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Paper,
  Tab,
  Table,
  TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip, Typography
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import CheckIcon from '@material-ui/icons/Check';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination, TabContext, TabList, TabPanel } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik, getIn } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import UnitSelect from '../../components/UnitSelect/UnitSelect';
import UnitDropdown from '../../utils/MetricUnits';
import { initialFormValues, NutMeal, NutMealTime, validation } from './FormikValues';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import useCalories from '../../hook/useCalories';

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
    paddingTop: 0,
    paddingBottom: 0,
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
  //=========

  avatarRoot: {
    borderRadius: 10,
    marginRight: 15,
    // width: theme.spacing(10),
    // height: theme.spacing(10),
  },
  textPrimary: {
    fontWeight: 'bold'
  },
  textSecondary: {
    color: '#A0A6B2'
  },
  noPadding: {
    padding: 0
  },
  benefitsList: {
    fontSize: '0.7rem',
    '&::before': {
      content: "'•  '",
      color: 'black',
    }
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
    paddingTop: theme.spacing(1),
    justifyContent: 'space-between'
  },
  cardActionsBenifitsRoot: {
    padding: 0,
    paddingTop: theme.spacing(1),
    display: 'block'
  },
  ulRoot: {
    listStyle: 'none',
    display: 'flex',
    padding: 0,
    margin: 0,
  },
  liRoot: {
    paddingLeft: '1em',
    textIndent: '-.7em',
  },
  ulTypo: {
    marginLeft: theme.spacing(0.5)
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
    background: 'white',
    margin: theme.spacing(1, -2)
  },
  mealTimeText: {
    margin: theme.spacing(2, 0)
  },
  benefitsText: {
    color: '#41A58D'
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
  },
  nutCard: {
    borderRadius: theme.spacing(3),
    margin: theme.spacing(2, 0)
  },
  nutCardRoot: {
    backgroundColor: '#41A58D',
    color: 'white'
  },
  nutCardTitle: {
    textAlign: 'center',
    color: 'inherit'
  },
  nutCardAction: {
    backgroundColor: '#276955',
    color: 'white',
    justifyContent: 'space-evenly'
  },
  circleBottom: {
    color: '#eeeeee42',
  },
  circleTop: {
    position: 'absolute',
    left: 0,
  },
  textareaAdornedEnd: {
    paddingRight: 0
  },
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

const NutritionPlan = () => {
  const classes = useStyles();
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const ConfModel = useConfModel();
  const [loading, setLoading] = useState(true);
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [nutritionPlanList, setNutritionPlanList] = useState([]);
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
      title: 'Add Nutrition Plan',
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
      title: 'Edit Nutrition Plan',
      okBtnText: 'Edit',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteNutritionPlan', { id: data._id })
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
      title: 'View Nutrition Plan',
    }));
  };

  const listNutritionPlan = async () => {
    setLoading(true);
    Post('app/listNutritionPlan', stateData)
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setNutritionPlanList(res.data);
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
    listNutritionPlan();
    closeAddEditDialog();
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
  };

  React.useEffect(() => {
    listNutritionPlan();
  }, []);

  return (
    <div className={classes.root}>
      <Page title='Nutrition Plan' />

      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Nutrition Plan
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
                  nutritionPlanList.map((data: any, index: number) => (
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
                {!loading && nutritionPlanList.length == 0 && (
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

      <AddEditModel
        {...addEditDialog}
        onClose={closeAddEditDialog}
        onSuccess={onSuccessAction}
      />
      {viewDialog.isOpen && (
        <ViewNutritionModel {...viewDialog} onClose={closeViewDialog} />
      )}
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
  const getCaloriesData = useCalories()
  const [tabValue, setTabValue] = React.useState('none');
  const [ingredientList, setIngredientList] = useState([])
  const [initialValue, setInitialValue] = React.useState({...initialFormValues});

  console.log(getCaloriesData)

  const onSubmit = (value: any, helper: any) => {
    helper.setSubmitting(true);
    const postData = { ...value };
    !isEdit && addData(postData, helper);
    isEdit && editData(postData, helper);
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addNutritionPlan', data)
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
    Post('app/editNutritionPlan', data)
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

  const addNewTab = (values: any, setFieldValue: any) => {
    const { nutrition } = values
    nutrition.push(NutMealTime)
    setFieldValue('nutrition', nutrition)
  }

  const submitMealTime = (i: number, values: any, setFieldValue: any) => {

    const { nutrition } = values
    const NewNutrition = { ...nutrition[i] }
    NewNutrition.isEdit = false
    nutrition[i] = NewNutrition
    setFieldValue('nutrition', nutrition)
    handleChangeTab(i.toString())
  }

  const editMealTime = (i: number, values: any, setFieldValue: any) => {
    const { nutrition } = values
    const NewNutrition = { ...nutrition[i] }
    NewNutrition.isEdit = true
    nutrition[i] = NewNutrition
    setFieldValue('nutrition', nutrition)
    handleChangeTab(i.toString())
  }

  const deleteMealTime = (i: number, values: any, setFieldValue: any) => {
    const { nutrition } = values
    const NewNutrition = nutrition.filter((d: any, index: number) => index != i)
    setFieldValue('nutrition', NewNutrition)
  }

  const addMeals = (values: any, i: number, setFieldValue: any) => {
    const FormKey = `nutrition[${i}].meals`
    const { nutrition } = values
    const meals = [...nutrition[i].meals]
    meals.push(NutMeal)
    setFieldValue(FormKey, meals)
  }



  const listAllMealIngredient = () => {
    Post('app/listAllMealIngredient', {})
      .then((response: any) => {
        if (!response.error) {
          setIngredientList(response.data);
        } else {
          Snackbar.show(response.message, 'error');
        }
      })
      .catch((error: any) => {
        Snackbar.show(error.message, 'error');
      });
  };

  const getArrayError = (error: any) => {
    return typeof error == 'string' ? error : ''
  }

  const removeMeals = (i: number, FieldName: string, values: any, setFieldValue: any) => {
    const MealValue = getIn(values, `${FieldName}.meals`)
    const FinelMealValue = MealValue.filter((d: any, index: number) => i != index)
    setFieldValue(`${FieldName}.meals`, FinelMealValue)
  }

  useEffect(() => {
    if (isEdit) {
      const { _id, ...rest } = data;
      const editData = { ...rest, id: _id };
      let nutrition = editData.nutrition.map((NutData: any) => {
        const { meals, ...rest } = NutData
        let NewMeals = meals.map((MealData: any) => {
          const { ingredients, ...rest } = MealData
          const IngredientIds = ingredientList.map(({ _id }: any) => _id)
          const NewInc = ingredients.filter(({ _id }: any) => IngredientIds.includes(_id)).map(({ _id }: any) => ({ id: _id }));
          return { ...rest, ingredients: NewInc }
        })
        return { ...rest, isEdit: false, meals: NewMeals }
      })
      editData.nutrition = nutrition
      console.log('editData', editData)
      setInitialValue(editData);
    } else {
      setInitialValue(initialFormValues);
    }
  }, [props, ingredientList]);

  useEffect(() => {
    listAllMealIngredient();
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
                      options={getCaloriesData}
                      value={getCaloriesData.find((data: any) => data.id == values.calories)}
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

                  {[{ label: 'Protein', key: 'protein' }, { label: 'Fat', key: 'fat' }, { label: 'Carbs', key: 'carbs' }].map(({ label, key }) =>
                    <>
                      <Grid item xs={2}>
                        <Typography style={{padding: '20px'}} variant='h5' align='left'>
                          <strong>{label}</strong>
                        </Typography>
                      </Grid>

                      {[{ label: 'Macros  ( % )', key: 'macros' }, { label: 'Gram  ( g )', key: 'gram' }, { label: 'Calories  ( Kcal )', key: 'calories' }].map((subData: any, index: any) => {
                        const SubKey = subData.key;
                        const FieldName = `${key}.${SubKey}`;
                        return (
                          <Grid item xs={3}>
                            <TextField
                              fullWidth
                              label={subData.label}
                              name={FieldName}
                              variant='outlined'
                              error={Boolean(getIn(touched, FieldName) && getIn(errors, FieldName))}
                              helperText={getIn(touched, FieldName) && getIn(errors, FieldName)}
                              value={getIn(values, FieldName)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        )
                      })}
                    </>
                  )}

                  {/* <Paper className={classes.paperRoot}> */}

                  <TabContext value={tabValue || ''}>
                    <Grid item xs={4}>
                      <TabList
                        classes={{
                          indicator: classes.tabIndicator
                        }}
                        orientation="vertical"
                        variant="standard"
                      >
                        {values?.nutrition.map((nutData: any, i: number) => {
                          let FieldName: string = `nutrition[${i}]`
                          let FieldTouched: any = getIn(touched, FieldName)
                          let FieldErrors: any = getIn(errors, FieldName)
                          let FieldValues: any = getIn(values, FieldName)
                          const TabSelected = i == Number(tabValue)
                          const SelectedStyle = TabSelected ? { borderRight: '2px solid #41a58d' } : { borderRight: '2px solid white' }
                          return (
                            <div className={classes.divTab}>
                              <Grid item container xs={12} spacing={1} style={{ margin: 'inherit', ...SelectedStyle }}>
                                <Grid item xs={nutData.isEdit ? 10 : 6}>

                                  {nutData.isEdit && <TextField
                                    fullWidth
                                    size='small'
                                    label='Name'
                                    name={`${FieldName}.meal_time`}
                                    variant='outlined'
                                    error={Boolean(FieldTouched?.meal_time && FieldErrors?.meal_time)}
                                    helperText={FieldTouched?.meal_time && FieldErrors?.meal_time}
                                    value={nutData?.meal_time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  }

                                  {!nutData.isEdit &&
                                    <Button
                                      fullWidth
                                      className={!Boolean(FieldTouched?.meal_time && FieldErrors?.meal_time) ? classes.themeButton : ''}
                                      classes={{
                                        fullWidth: classes.tabBtnIcon
                                      }}
                                      variant='contained'
                                      color='secondary'
                                    >
                                      {!Boolean(FieldTouched?.meal_time && FieldErrors?.meal_time) ? nutData?.meal_time : FieldErrors?.meal_time}
                                    </Button>}
                                </Grid>

                                {nutData.isEdit &&
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

                                {!nutData.isEdit && <Grid item xs={2} >
                                  <Button
                                    fullWidth
                                    classes={{
                                      fullWidth: classes.tabBtnIcon
                                    }}
                                    variant='contained'
                                    color='primary'
                                    onClick={(e) => handleChangeTab(i.toString())}
                                  >
                                    <ChevronRightIcon />
                                  </Button>
                                </Grid>
                                }

                                {!nutData.isEdit && <Grid item xs={2} >
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

                                {!nutData.isEdit &&
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
                                error={Boolean(getIn(touched, 'nutrition') && getArrayError(getIn(errors, 'nutrition')))}
                              >
                                <Button
                                  fullWidth
                                  className={classes.themeButton}
                                  variant='contained'
                                  color='secondary'
                                  onClick={() => addNewTab(values, setFieldValue)}
                                >
                                  Add Meal Time<AddIcon />
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
                      {values?.nutrition.map((nutData: any, i: number) => {
                        let FieldMainName: string = `nutrition[${i}]`
                        return (
                          <TabPanel key={i} className={classes.tabPanelRoot} value={i.toString()}>

                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography variant='h5' align='center'>
                                  <strong>{nutData?.meal_time}</strong>
                                </Typography>
                              </Grid>

                              {nutData?.meals.map((mealData: any, i: number) => {
                                let FieldName: string = `${FieldMainName}.meals[${i}]`
                                let FieldTouched: any = getIn(touched, FieldName)
                                let FieldErrors: any = getIn(errors, FieldName)
                                let FieldValues: any = getIn(values, FieldName)
                                return (
                                  <>
                                    <Grid item xs={11}>
                                      <Typography variant='h5' align='center' >
                                        <strong>{`Meal #${i + 1}`}</strong>
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={1}>
                                      <Button
                                        fullWidth
                                        classes={{
                                          fullWidth: classes.tabBtnIcon
                                        }}
                                        variant='contained'
                                        color='secondary'
                                        onClick={() => removeMeals(i, FieldMainName, values, setFieldValue)}
                                      >
                                        <DeleteIcon />
                                      </Button>
                                    </Grid>

                                    <Grid item md={12} xs={12}>
                                      <Autocomplete
                                        multiple
                                        options={ingredientList}
                                        value={ingredientList.filter((data: any) => mealData.ingredients.map(({ id }: any) => id).includes(data._id))}
                                        getOptionLabel={(option: any) => option.name}
                                        onChange={(event: any, newValue: any) => {
                                          let IngIds = newValue.map(({ _id }: any) => ({ id: _id }))
                                          setFieldValue(`${FieldName}.ingredients`, IngIds || []);
                                        }}
                                        onBlur={handleBlur}
                                        renderInput={(params: any) => (
                                          <TextField
                                            {...params}
                                            label='Ingredient'
                                            variant='outlined'
                                            error={Boolean(FieldTouched?.ingredients && FieldErrors?.ingredients)}
                                            helperText={FieldTouched?.ingredients && FieldErrors?.ingredients}
                                            inputProps={{
                                              ...params.inputProps,
                                            }}
                                          />
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        fullWidth
                                        label='Quantity'
                                        name={`${FieldName}.quantity`}
                                        variant='outlined'
                                        error={Boolean(FieldTouched?.quantity && FieldErrors?.quantity) || Boolean(FieldTouched?.quantity_unit && FieldErrors?.quantity_unit)}
                                        helperText={FieldTouched?.quantity && FieldErrors?.quantity || (FieldTouched?.quantity_unit && FieldErrors?.quantity_unit)}
                                        value={mealData.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                          classes: {
                                            adornedEnd: classes.textareaAdornedEnd
                                          },
                                          endAdornment: <UnitSelect id='quantity_unit' option={UnitDropdown} name={`${FieldName}.quantity_unit`} value={mealData.quantity_unit} onChange={handleChange} onBlur={handleBlur} />
                                        }}
                                      />
                                     </Grid>

                                    <Grid item md={6} xs={6}>
                                      <TextField
                                        fullWidth
                                        multiline
                                        label='Protein ( g )'
                                        name={`${FieldName}.protein`}
                                        variant='outlined'
                                        error={Boolean(FieldTouched?.protein && FieldErrors?.protein)}
                                        helperText={FieldTouched?.protein && FieldErrors?.protein}
                                        value={mealData.protein}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Grid>

                                    <Grid item md={6} xs={6}>
                                      <TextField
                                        fullWidth
                                        multiline
                                        label='Fat ( g )'
                                        name={`${FieldName}.fat`}
                                        variant='outlined'
                                        error={Boolean(FieldTouched?.fat && FieldErrors?.fat)}
                                        helperText={FieldTouched?.fat && FieldErrors?.fat}
                                        value={mealData.fat}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Grid>

                                    <Grid item md={6} xs={6}>
                                      <TextField
                                        fullWidth
                                        multiline
                                        label='Carbs ( g )'
                                        name={`${FieldName}.carbs`}
                                        variant='outlined'
                                        error={Boolean(FieldTouched?.carbs && FieldErrors?.carbs)}
                                        helperText={FieldTouched?.carbs && FieldErrors?.carbs}
                                        value={mealData.carbs}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Grid>

                                    <Grid item md={6} xs={6}>
                                      <TextField
                                        fullWidth
                                        multiline
                                        label='calories ( kcal )'
                                        name={`${FieldName}.calories`}
                                        variant='outlined'
                                        error={Boolean(FieldTouched?.calories && FieldErrors?.calories)}
                                        helperText={FieldTouched?.calories && FieldErrors?.calories}
                                        value={mealData.calories}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Grid>
                                  </>
                                )
                              })}

                              <Grid item md={12} xs={12}>
                                <FormControl fullWidth
                                  error={Boolean(getIn(touched, `${FieldMainName}.meals`) && getArrayError(getIn(errors, `${FieldMainName}.meals`)))}
                                >
                                  <Button
                                    fullWidth
                                    className={classes.themeButton}
                                    variant='contained'
                                    color='default'
                                    onClick={() => addMeals(values, i, setFieldValue)}
                                    endIcon={<ControlPointIcon />}
                                  >
                                    Add Meals
                                  </Button>

                                  <FormHelperText>
                                    {getIn(touched, `${FieldMainName}.meals`) && getArrayError(getIn(errors, `${FieldMainName}.meals`))}
                                  </FormHelperText>
                                </FormControl>
                              </Grid>

                            </Grid>

                          </TabPanel>
                        )
                      }
                      )}

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

const ViewNutritionModel = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);
  const [tabValue, setTabValue] = React.useState<any>('0');
  const [timings, setTimings] = React.useState('Early-Morning');

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
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
                <TableCell><strong>{formValue?.calories} Kcal</strong></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>

        <Card className={classes.nutCard}>
          <CardHeader
            classes={{
              root: classes.nutCardRoot,
              title: classes.nutCardTitle
            }}
            title={`${formValue?.calories} Kcal`}
          />
          <CardActions className={classes.nutCardAction}>
            <NutritionData title='Protein' data={formValue?.protein} />
            <NutritionData title='Fat' data={formValue?.fat} />
            <NutritionData title='Carbs' data={formValue?.carbs} />
          </CardActions>
        </Card>

        <Paper>
          <TabContext value={tabValue || ''}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={3}>
                <TabList
                  classes={{
                    indicator: classes.tabIndicator
                  }}
                  onChange={handleTabChange}
                  orientation="vertical"
                  variant="standard"
                >
                  {formValue?.nutrition.map((nutData: any, i: number) => {
                    const { meal_time } = nutData
                    return (
                      <Tab
                        classes={{ root: classes.tabRoot, textColorInherit: classes.tabTextColorInherit }}
                        label={meal_time}
                        value={i.toString()} />
                    )
                  }
                  )}

                </TabList>
              </Grid>

              <Grid item xs={9}>
                {formValue?.nutrition.map((nutData: any, i: number) => {
                  const { meals = [] } = nutData
                  return (
                    <TabPanel key={i} className={classes.tabPanelRoot} value={i.toString()}>
                      {meals.map((mealData: any, i: number) => {
                        const { ingredients = [] } = mealData
                        return (
                          <>
                            <Grid item xs={12} className={classes.mealTimeText}>
                              <Typography variant='h5' align='center'>
                                <strong>{`Meal #${i + 1}`}</strong>
                              </Typography>
                            </Grid>
                            <Grid item container xs={12} spacing={2}>
                              {ingredients.map((incData: any, i: number) => {
                                const { benfits = [] } = incData
                                return (

                                  <Grid item xs={12} sm={12} md={6}>
                                    <Card elevation={0} className={classes.cardRoot}>
                                      <CardContent className={classes.cardContentRoot}>
                                        <List className={classes.noPadding}>
                                          <ListItem disableGutters className={classes.noPadding}>
                                            <ListItemAvatar>
                                              <Avatar className={classes.avatarRoot} src={incData.image?.url} />
                                            </ListItemAvatar>
                                            <ListItemText
                                              classes={{
                                                primary: classes.textPrimary,
                                                secondary: classes.textSecondary
                                              }}
                                              primary={incData.name}
                                              secondary={incData.quantity}
                                            />
                                          </ListItem>
                                        </List>

                                        <CardActions disableSpacing className={classes.cardActionsRoot}>
                                          <div>
                                            <Typography variant="body2" >
                                              <ul className={classes.ulRoot}>
                                                <li className={clsx(classes.liRoot, classes.colorProtein)}>Protein</li>
                                                <Typography className={classes.ulTypo} variant="body1" >{incData.protein}</Typography>
                                              </ul>
                                            </Typography>

                                          </div>

                                          <div>
                                            <Typography variant="body2" >
                                              <ul className={classes.ulRoot}>
                                                <li className={clsx(classes.liRoot, classes.colorFat)}>Fat</li>
                                                <Typography className={classes.ulTypo} variant="body1" >{incData.fat}</Typography>
                                              </ul>
                                            </Typography>

                                          </div>

                                          <div>
                                            <Typography variant="body2" >
                                              <ul className={classes.ulRoot}>
                                                <li className={clsx(classes.liRoot, classes.colorCarbs)}>Carbs</li>
                                                <Typography className={classes.ulTypo} variant="body1" >{incData.carbs}</Typography>
                                              </ul>
                                            </Typography>

                                          </div>
                                        </CardActions>

                                        <Divider className={classes.dividerRoot} />
                                        <CardActions disableSpacing className={classes.cardActionsBenifitsRoot}>
                                          <Grid item container xs={12} className={classes.benefitsText}>
                                            <Typography variant='body2' color='inherit'>
                                              <strong>Benefits:</strong>
                                            </Typography>
                                          </Grid>
                                          <Grid item container xs={12}>

                                            {benfits.map((benfData: any, i: number) =>
                                              <Grid item xs={12} sm={6} >
                                                <ul className={classes.ulRoot}>
                                                  <li className={clsx(classes.liRoot, classes.benefitsList)}>{benfData}</li>

                                                </ul>
                                              </Grid>)}

                                          </Grid>
                                        </CardActions>

                                      </CardContent>
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


      </DialogContent >

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog >
  );
};

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  const classes = useStyles();
  return (
    <Box position="relative" display="inline-flex" color='inherit' alignItems="center">
      <CircularProgress
        variant="determinate"
        className={classes.circleBottom}
        size={50}
        thickness={3}
        {...props}
        value={100}
      />
      <CircularProgress size={50} className={classes.circleTop} color='inherit' variant="determinate" {...props} />
      <Box
        color='inherit'
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography color='inherit' variant="caption" component="div" >{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const NutritionData = (props: any) => {
  const [data, setData] = useState(props.data)
  const [title, setTitle] = useState(props.title)

  useEffect(() => {
    setData(props.data)
    setTitle(props.title)
  }, [props])
  return (
    <div >
      <Typography color='inherit' align='center'>
        <CircularProgressWithLabel value={data?.macros || 0} />
      </Typography>
      <Typography color='inherit' variant='h6' align='center'>
        <strong>{title}</strong>
      </Typography>
      <Typography color='inherit' variant='body2' align='center'>
        {`${data?.gram} g`}
      </Typography>
      <Typography color='inherit' variant='body2' align='center'>
        {`${data?.calories} c`}
      </Typography>
    </div>
  )
}

export default NutritionPlan;

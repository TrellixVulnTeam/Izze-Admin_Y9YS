import React, { useRef, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, FormControl, FormHelperText, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Divider, Typography, Tabs } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination, TabContext, TabList, TabPanel } from '@material-ui/lab';
import TipTapEditor from '../../components/TipTapEditor/TipTapEditor/TipTapEditor';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { imageUpload } from '../../utils/FirebaseUtils';
import { Formik, getIn, useFormikContext } from 'formik';
import * as Yup from 'yup';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TimerIcon from '@material-ui/icons/Timer';
import CarbsImages from '../../assets/Images/Carbs.png'
import ProteinsImages from '../../assets/Images/Protein.png'
import FatImages from '../../assets/Images/Fat.png'
import { useEffect } from 'react';
import UnitSelect from '../../components/UnitSelect/UnitSelect';
import UnitDropdown from '../../utils/MetricUnits';



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
  workouttermsavatar: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    width: '100%',
    height: '50px',
  },
  timeText: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
  tabCard: {
    marginTop: theme.spacing(3),
  },
  sEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  iconPadd: {
    padding: 5,
  },
  jCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageView: {
    width: '100%',
    height: '100%',
  },
  avatarRoot: {
    borderRadius: 10,
    marginRight: 15,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  textPrimary: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  textSecondary: {
    marginTop: 10,
    color: '#f0c100',
  },
  ingrdientsGridMain: {
    marginTop: 10,
  },
  ingredientsAvatarRoot: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 'auto',
  },
  htmlContentGrid: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  noIngredientsText: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  textareaAdornedEnd: {
    paddingRight: 0
  },
  htmlContent: {
    '& ul': {
      paddingLeft: '1.2rem',
    },
    '& p': {
      textAlign: 'justify',
    },
  },
}))

function MealRecipe() {
  const classes = useStyles();
  const ConfModel = useConfModel();
  const [loading, setLoading] = React.useState(false);
  const [mealRecipeTableData, setMealRecipeTableData] = React.useState([]);
  const [stateData, setStateData] = React.useState({ page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = React.useState(0);
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const [addEditDialog, setAddEditDialog] = React.useState({
    isOpen: false,
    title: '',
    okBtnText: '',
    isEdit: false,
    data: {},
  });
  const [viewDialog, setViewDialog] = React.useState({
    isOpen: false,
    title: '',
    data: {},
  });

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Meal Recipe',
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
      title: 'Edit Meal Recipe',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Meal Recipe',
    }));
  };

  const listMealRecipies = async () => {
    setLoading(true);
    Post('app/listMealRecipe', stateData)
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setMealRecipeTableData(res.data);
          setPageCount(res.page_count);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
        setLoading(false);
        Snackbar.show(err.message, 'error');
      });
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteMealRecipe', { id: data._id })
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
    listMealRecipies();
    closeAddEditDialog();
  };


  const setElipsis = (text: any) => {
    return text?.length >= 25 ? `${text.substring(0, 40)}...` : text;
  };

  React.useEffect(() => {
    listMealRecipies();
  }, [stateData]);
  return (
    <div className={classes.root}>
      <Page title='Meal Recipe' />
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Meal Recipe
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
                  <TableCell align='center'>Meal Recipe Image</TableCell>
                  <TableCell align='center'>Meal Recipe Name</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  mealRecipeTableData.map((data: any, index: number) => (
                    <TableRow hover key={index}>
                      <TableCell align='center'>
                        {stateData.page_limit * (stateData.page_no - 1) +
                          index +
                          1}
                      </TableCell>
                      <TableCell align='center'>
                        <div className={classes.jCenter}>
                          <Avatar variant='square' src={data?.image} />
                        </div>
                      </TableCell>
                      <TableCell align='center'>{data?.name}</TableCell>
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
                {!loading && mealRecipeTableData.length == 0 && (
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

      <ViewModel {...viewDialog} onClose={closeViewDialog} />

    </div>
  )
}

interface MealTerms {
  name: string,
  image: { file: string | null, prevImage: string, isNew: boolean | null },
  term: string
}

interface Ingredients {
  id: string,
  quantity: string,
  quantity_unit: string,
}

interface MealPlan {
  name: string,
  image: { file: string | null, prevImage: string, isNew: boolean | null },
  nutrition: string,
  description: string,
  protein: string,
  fat: string,
  carbs: string,
  terms: MealTerms[],
  ingredients: Ingredients[],
  preparation_time: string,
  preparation_description: string

}

const mealTerms: MealTerms = {
  name: '',
  image: { file: null, prevImage: '', isNew: null },
  term: ''
}

const ingredientsSelect: Ingredients = {
  id: '',
  quantity: '',
  quantity_unit: '',
}

const initialFormValues: MealPlan = {
  name: '',
  image: { file: null, prevImage: '', isNew: null },
  nutrition: '',
  description: '',
  protein: '',
  fat: '',
  carbs: '',
  terms: [mealTerms],
  ingredients: [ingredientsSelect],
  preparation_time: '',
  preparation_description: ''
}

export const AddEditModel = (props: any) => {
  const { isEdit, isOpen, okBtnText = 'OK', onClose, data, title, onSuccess } = props;
  const classes = useStyles()
  const [initialValues, setInitialValues] = React.useState({ ...initialFormValues });
  const formikRef = React.useRef<any>(null);
  const imageRef = React.useRef<any>(null);
  const [ingredientsList, setIngredientsList] = React.useState([])
  const { Post } = useService();
  const Snackbar = useSnackbar();

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        formikRef.current.setFieldValue('image', {
          file,
          prevImage: reader.result,
          isNew: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formikRef.current.setFieldValue('image', {
        workoutTermsName: '',
        image: { file: null, prevImage: '', isNew: null },
        description: '',
      });
    }
  }

  const onSubmit = (value: any, helper: any) => {
    try {
      helper.setSubmitting(true)

      const renderSubmit = async () => {
        const { terms, ...rest } = value;
        const postData = rest;

        const TermPromiseArray = terms.map(async (termData: any) => {
          let { image, ...rest } = termData
          let { isNew, file } = image
          if (isNew) {
            return imageUpload(file).then((image) => {
              return { image, ...rest }
            })
          }
          else {
            return Promise.resolve({ ...rest, image: file })
          }
        })

        Promise.all(TermPromiseArray).then((termData: any) => {
          postData.terms = termData;

          let { isNew, file } = postData.image;
          if (isNew) {
            return imageUpload(file)
          }
          else {
            return file;
          }
        }).then((imageUrl: any) => {
          postData.image = imageUrl
          !isEdit && addData(postData, helper);
          isEdit && editData(postData, helper);
        }).catch((err: any) => {
          console.log(err)
          Snackbar.show('Internal Server Error', 'error');
        });
      }
      renderSubmit()
    }
    catch {
      Snackbar.show('Image Upload Failed', 'error');
    }
  }

  const addData = async (value: any, { setSubmitting, resetForm }: any) => {
    await Post('app/addMealRecipe', value)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        Snackbar.show(err.message, 'error');
      });
  };

  const editData = async (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    await Post('app/editMealRecipe', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        Snackbar.show(err.message, 'error');
      });
  };

  const listAllMealRecipe = () => {
    Post('app/listAllMealIngredient', {})
      .then((res: any) => {
        if (!res.error) {
          let getequipmentList = res.data.map((data: any) => {
            data.id = data._id;
            return data;
          });
          setIngredientsList(getequipmentList);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
        Snackbar.show(err.message, 'error');
      });
  }

  const addMealRecipeTerms = (values: MealPlan, setFieldValue: any) => {
    const { terms } = values
    terms.push(mealTerms);
    setFieldValue('terms', terms)
  }

  const addIngredients = (values: MealPlan, setFieldValue: any) => {
    const { ingredients } = values;
    ingredients.push(ingredientsSelect)
    setFieldValue('ingredients', ingredients)
  }

  const removeIngredients = (values: MealPlan, items: any, setFieldValue: any) => {
    const { ingredients } = values;
    const sampleDummyArray = [...ingredients];
    sampleDummyArray.splice(sampleDummyArray.indexOf(items), 1)
    setFieldValue('ingredients', sampleDummyArray)
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, value: any, index: any) => {
    formikRef.current.setFieldValue(`ingredients[${index}].id`, value?.id);
  }

  React.useEffect(() => {
    listAllMealRecipe();
  }, [])

  React.useEffect(() => {
    if (isEdit) {
      const { terms, image, _id, ingredients, ...rest } = data;
      const editData = { ...rest, id: _id };
      const RecipeIds = ingredientsList.map(({ _id }: any) => _id)
      editData.image = { file: image, prevImage: image, isNew: false };
      editData.ingredients = ingredients.filter(({ _id }: any) => RecipeIds.includes(_id)).map(({ _id, quantity }: any) => ({ id: _id, quantity }))
 
      editData.terms = terms.map((items: any) => {
        return {
          name: items.name,
          image: { file: items.image, prevImage: items.image, isNew: false },
          term: items.term
        }
      })
      setInitialValues(editData)
    }
    else {
      setInitialValues(initialFormValues)
    }
  }, [props])

  return (
    <>
      <Dialog
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth='md'
        aria-labelledby='dialog-title'
      >
        <DialogTitle id='dialog-title' onClose={onClose}>
          {title}
        </DialogTitle>
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().trim().required('Name is required'),
            nutrition: Yup.string().trim().required('Nutrition is required'),
            description: Yup.string().trim().max(250, 'Must be 250 characters or less').required('Description is required'),
            protein: Yup.number().typeError('Protein must be in number').required('Protein is required'),
            fat: Yup.number().typeError('Fat must be in number').required('Fat is required'),
            carbs: Yup.number().typeError('Carbs must be in number').required('Carbs is required'),
            terms: Yup.array().of(
              Yup.object().shape({
                name: Yup.string()
                  .trim()
                  .required('Meal recipe name is Required'),
                image: Yup.object({
                  file: Yup.mixed().required('required'),
                }),
                term: Yup.string()
                  .trim()
                  .required('Meal Recipe terms is Required'),
              })
            ),
            ingredients: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().trim().required('Ingredients is Required'),
                quantity: Yup.number().typeError('Quantity must be in number').required('Quantity is Required'),
                quantity_unit: Yup.string().trim().required('Quantity unit is required'),
              })),
            preparation_time: Yup.string().trim().required('Preparation time is required'),
            preparation_description: Yup.string().trim().max(250, 'Must be 250 characters or less').required('Preparation description is required'),
            image: Yup.object({
              file: Yup.mixed().required('A file is required'),
            }),
          })}
        >
          {({ values, errors, touched, handleBlur, handleChange, setFieldValue, submitForm, setFieldTouched, isSubmitting, }) => (
            <>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Name'
                      name='name'
                      variant='outlined'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.name && errors.name
                      )}
                      helperText={
                        touched.name && errors.name
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      multiline
                      label='Description'
                      name='description'
                      variant='outlined'
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.description && errors.description
                      )}
                      helperText={
                        touched.description && errors.description
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Nutrition'
                      name='nutrition'
                      variant='outlined'
                      value={values.nutrition}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.nutrition && errors.nutrition
                      )}
                      helperText={
                        touched.nutrition && errors.nutrition
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Protein'
                      name='protein'
                      variant='outlined'
                      value={values.protein}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.protein && errors.protein
                      )}
                      helperText={
                        touched.protein && errors.protein
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Fat'
                      name='fat'
                      variant='outlined'
                      value={values.fat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.fat && errors.fat
                      )}
                      helperText={
                        touched.fat && errors.fat
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Carbs'
                      name='carbs'
                      variant='outlined'
                      value={values.carbs}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.carbs && errors.carbs
                      )}
                      helperText={
                        touched.carbs && errors.carbs
                      }
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Button
                      fullWidth
                      className={classes.themeButton}
                      variant='contained'
                      color='default'
                      onClick={() => addMealRecipeTerms(values, setFieldValue)}
                      endIcon={<ControlPointIcon />}
                    >
                      Add Terms
                    </Button>
                  </Grid>

                  {values?.terms?.map((items: any, index: any) => <TermsComponent key={index} index={index} />)}

                  <Grid item md={12} xs={12}>
                    <Button
                      fullWidth
                      className={classes.themeButton}
                      variant='contained'
                      color='default'
                      onClick={() => addIngredients(values, setFieldValue)}
                      endIcon={<ControlPointIcon />}
                    >
                      Add Ingredients
                    </Button>
                  </Grid>

                  {values?.ingredients?.map((items: any, index: any) => (
                    <Grid
                      key={index}
                      item
                      container
                      md={12}
                      xs={12}
                      direction='row'
                      spacing={2}
                    >
                      <Grid item md={5} xs={12}>
                        <Autocomplete
                          fullWidth
                          options={ingredientsList}
                          value={ingredientsList.find(
                            (data: any) => data._id == items.id
                          )}
                          getOptionLabel={(option: any) => option.name}
                          getOptionSelected={(option) =>
                            option.id == items.id
                          }
                          onChange={(event: any, newValue) => handleOptionChange(event, newValue, index)}
                          onBlur={handleBlur}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Ingredients'
                              variant='outlined'
                              error={Boolean(
                                touched?.ingredients &&
                                touched?.ingredients[index]?.id &&
                                errors?.ingredients &&
                                (errors?.ingredients[index] as any)?.id
                              )}
                              helperText={
                                touched?.ingredients &&
                                touched?.ingredients[index]?.id &&
                                errors?.ingredients &&
                                (errors?.ingredients[index] as any)?.id
                              }
                              inputProps={{
                                ...params.inputProps,
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6} xs={8}>
                        <TextField
                          fullWidth
                          label='Quantity'
                          name={`ingredients[${index}].quantity`}
                          variant='outlined'
                          error={Boolean(touched?.ingredients && touched?.ingredients[index]?.quantity && errors?.ingredients &&
                            (errors?.ingredients[index] as any)?.quantity
                          ) || Boolean(touched?.ingredients && touched?.ingredients[index]?.quantity_unit && errors?.ingredients &&
                            (errors?.ingredients[index] as any)?.quantity_unit
                          )}
                          helperText={
                            touched?.ingredients &&
                            touched?.ingredients[index]?.quantity &&
                            errors?.ingredients &&
                            (errors?.ingredients[index] as any)?.quantity
                            || touched?.ingredients &&
                            touched?.ingredients[index]?.quantity_unit &&
                            errors?.ingredients &&
                            (errors?.ingredients[index] as any)?.quantity_unit
                          }
                          value={items.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            classes: {
                              adornedEnd: classes.textareaAdornedEnd
                            },
                            endAdornment: <UnitSelect id='quantity_unit' option={UnitDropdown} name={`ingredients[${index}].quantity_unit`} value={items.quantity_unit} onChange={handleChange} onBlur={handleBlur} />
                          }}
                        />
                      </Grid>

                      <Grid item md={1} xs={4}>
                        <Button
                          fullWidth
                          className={classes.deleteButton}
                          variant='contained'
                          color='secondary'
                          onClick={() => removeIngredients(values, items, setFieldValue)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label='Preparation Time'
                      name='preparation_time'
                      variant='outlined'
                      value={values.preparation_time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.preparation_time && errors.preparation_time
                      )}
                      helperText={
                        touched.preparation_time && errors.preparation_time
                      }
                    />
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched?.preparation_description &&
                        errors?.preparation_description
                      )}
                    >
                      <TipTapEditor
                        value={values.preparation_description}
                        onChange={(value: any) => setFieldValue('preparation_description', value)}
                        onBlur={() => setFieldTouched('preparation_description', true, true)}
                      />

                      <FormHelperText>
                        {touched?.preparation_description &&
                          errors?.preparation_description}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <input
                      name='image'
                      ref={imageRef}
                      type='file'
                      accept='.jpg,.png,jpeg'
                      onChange={onImageChange}
                      onBlur={handleBlur}
                      hidden
                    />
                    <Button
                      fullWidth
                      className={classes.themeButton}
                      variant='contained'
                      color='default'
                      onClick={() => imageRef.current.click()}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Image
                    </Button>
                    <FormControl
                      error={Boolean(
                        touched?.image?.file && errors?.image?.file
                      )}
                    >
                      <FormHelperText>
                        {touched?.image?.file &&
                          errors?.image?.file}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {values.image?.prevImage && (
                      <img
                        className={classes.imageView}
                        src={values.image?.prevImage}
                      />
                    )}
                  </Grid>
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
  )
}

const TermsComponent = (props: any) => {
  const FormikContext = useFormikContext()
  const [{ values, errors, touched, setFieldValue, handleBlur, handleChange }, setFormikContext] = useState(FormikContext)
  const { index } = props
  const classes = useStyles()
  const imgRef = useRef<any>(null)
  const FieldName = `terms[${index}]`;
  const FieldValue = getIn(values, `terms[${index}]`);
  const FieldError = getIn(errors, `terms[${index}]`);
  const FieldTouched = getIn(touched, `terms[${index}]`);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        setFieldValue(`${FieldName}.image`, { file, prevImage: reader.result, isNew: true, });
      };
      reader.readAsDataURL(file);
    } else {
      setFieldValue(`${FieldName}.image`, { file: null, prevImage: '', isNew: null });
    }
  }

  const removeTerm = () => {
    const OldTerms = getIn(values, 'terms');
    const Terms = OldTerms.filter((d: any, i: number) => i != index);
    setFieldValue('terms', Terms);
  }

  useEffect(() => {
    setFormikContext(FormikContext)
  }, [FormikContext])

  return (
    <Grid
      item
      container
      md={12}
      xs={12}
      direction='row'
      spacing={2}
    >
      <Grid item md={1} xs={12}>
        <input
          name={`${FieldName}.image`}
          ref={imgRef}
          type='file'
          accept='.jpg,.png,jpeg'
          onChange={(e) => onImageChange(e)}
          onBlur={handleBlur}
          hidden
        />
        <Avatar
          className={classes.workouttermsavatar}
          variant='square'
          onClick={() => imgRef?.current?.click()}
          src={FieldValue?.image?.prevImage}
        />
        <FormControl error={Boolean(FieldTouched?.image?.file && FieldError?.image?.file)}>
          <FormHelperText>{FieldTouched?.image?.file && FieldError?.image?.file}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item md={5} xs={12}>
        <TextField
          fullWidth
          multiline
          label='Terms name'
          name={`${FieldName}.name`}
          variant='outlined'
          error={Boolean(FieldTouched?.name && FieldError?.name)}
          helperText={FieldTouched?.name && FieldError?.name}
          value={FieldValue.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item md={5} xs={8}>
        <TextField
          fullWidth
          multiline
          label='Terms description'
          name={`${FieldName}.term`}
          variant='outlined'
          error={Boolean(FieldTouched?.term && FieldError?.term)}
          helperText={FieldTouched?.term && FieldError?.term}
          value={FieldValue.term}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item md={1} xs={4}>
        <Button
          fullWidth
          className={classes.deleteButton}
          variant='contained'
          color='secondary'
          onClick={() => removeTerm()}
        >
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>

  )
}

export const ViewModel = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = React.useState(data);
  React.useEffect(() => {
    setFormValue(data);
  }, [props]);

  console.log(formValue)

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth='sm'
      aria-labelledby='dialog-view-title'
      open={isOpen}
    >
      <DialogTitle id='dialog-view-title' onClose={onClose}>
        {title}
      </DialogTitle>

      <DialogContent dividers>
        <div>
          <img
            src={formValue?.image}
            alt={'Workout image'}
            className={classes.imageView}
          />
        </div>
        <Typography variant='h4'><strong>{formValue?.name}</strong></Typography>

        <Grid
          container
          spacing={2}
          className={classes.ingrdientsGridMain}
          justify='center'
        >
          {formValue?.terms?.map((value: any, index: any) => (
            <Grid key={index} item xs={4} md={3}>
              <Avatar
                className={classes.ingredientsAvatarRoot}
                src={value?.image}
              />
              <Typography variant='h6' align='center'>
                {value?.name}
              </Typography>
              <Typography variant='subtitle2' align='center'>
                {value.term.length >= 25
                  ? `${value.term.substring(0, 30)}...`
                  : value.term}
              </Typography>
            </Grid>
          ))}
          {formValue?.workout_terms?.length == 0 && (
            <Grid item xs={12} md={12} className={classes.noIngredientsText}>
              <div>No Ingredients</div>
            </Grid>
          )}
        </Grid>

        <Typography variant='h5' align='left' style={{ color: '#41A58D' }} className={classes.textPrimary}>
          INGREDIENTS
        </Typography>

        {formValue?.ingredients?.map((items: any, index: any) => {
          return (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatarRoot} src={items.image} />
                </ListItemAvatar>
                <ListItemText primary={items?.name} secondary={items?.description} />
                <Typography>{items.calories} gm</Typography>
              </ListItem>
            </List>
          )
        })}

        <Typography variant='h5' align='left' style={{ color: '#41A58D' }} className={classes.textPrimary}>
          NUTRITIONAL INFORMATION
        </Typography>

        <Grid
          container
          spacing={2}
          className={classes.ingrdientsGridMain}
          justify='center'
        >
          <Grid item xs={4} md={3}>
            <Avatar
              className={classes.ingredientsAvatarRoot}
              src={CarbsImages}
            />
            <Typography align='center'>Carbs</Typography>
            <Typography align='center'>{formValue?.carbs}g</Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Avatar
              className={classes.ingredientsAvatarRoot}
              src={ProteinsImages}
            />
            <Typography align='center'>Protein</Typography>
            <Typography align='center'>{formValue?.protein}g</Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Avatar
              className={classes.ingredientsAvatarRoot}
              src={FatImages}
            />
            <Typography align='center'>Fat</Typography>
            <Typography align='center'>{formValue?.fat}g</Typography>
          </Grid>
        </Grid>

        <Typography variant='h6' align='left' style={{ color: '#41A58D', marginTop: '20px' }}><strong>PREPARATION</strong></Typography>
        <Typography variant='body2' align='center' className={classes.timeText}>
          <TimerIcon fontSize='inherit' />
          <span>{formValue?.preparation_time}</span>
        </Typography>

        <Grid container >
          <Grid item xs={12} md={12} className={classes.htmlContentGrid}>
            <div className={classes.htmlContent} dangerouslySetInnerHTML={{ __html: formValue?.preparation_description }} />
          </Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>

    </Dialog>
  )
}

export default MealRecipe

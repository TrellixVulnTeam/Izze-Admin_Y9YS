import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Autocomplete, Pagination } from '@material-ui/lab';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import TipTapEditor from '../../components/TipTapEditor/TipTapEditor/TipTapEditor';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import { imageUpload } from '../../utils/FirebaseUtils';
import TimerIcon from '@material-ui/icons/Timer';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  addIcon: {
    marginRight: theme.spacing(1),
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
  themeButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  lColor: {
    color: 'white',
  },
  deleteButton: {
    width: '100%',
    height: '50px',
  },
  avatarStyles: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    // margin: 'auto',
  },
  ingredientsAvatarStyle: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
  },
  marginTopStyle: {
    marginTop: theme.spacing(2),
  },
  adjustmentTop: {
    marginTop: '5px',
  },
}));

const SkinCareRecipe = () => {
  const classes = useStyles();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const listSkinCare = async () => {
    setLoading(true);
    Post('app/listSkinCareRecipe', stateData)
      .then((res: any) => {
        console.log('listSkinCare', res);
        setLoading(false);
        if (!res.error) {
          setDataList(res.data);
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

  const setElipsis = (text: any) => {
    return text.length >= 25 ? `${text.substring(0, 40)}...` : text;
  };

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      isEdit: false,
      title: 'Add Recpie',
      okBtnText: 'Save',
    }));
  };

  const openEditDialog = (data: any) => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      isEdit: true,
      data,
      title: 'Edit Recpie',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Recpie',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteSkinCareRecipe', { id: data._id })
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

  const closeAddEditDialog = () => {
    setAddEditDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const closeViewDialog = () => {
    setViewDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const onSuccessAction = () => {
    listSkinCare();
    closeAddEditDialog();
  };

  useEffect(() => {
    listSkinCare();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Skin Care Recipe' />

      {/* =======Header====== */}
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Skin Care Recipe
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
                  <TableCell align='center'>Image</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Description</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  dataList.map((data: any, index: number) => (
                    <TableRow hover key={index}>
                      <TableCell align='center'>
                        {stateData.page_limit * (stateData.page_no - 1) + index + 1}
                      </TableCell>
                      <TableCell align='center'>
                        <div className={classes.jCenter}>
                          <Avatar variant='square' src={data?.recipe_image} />
                        </div>
                      </TableCell>
                      <TableCell align='center'>{data?.recipe_name}</TableCell>
                      <TableCell align='center'>
                        <Tooltip title={data?.recipe_description}>
                          <span>{setElipsis(data?.recipe_description)}</span>
                        </Tooltip>
                      </TableCell>
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
                {!loading && dataList.length == 0 && (
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

      {/* ============Add Edit Dialog========== */}
      <AddEditDailog
        {...addEditDialog}
        onClose={closeAddEditDialog}
        onSuccess={onSuccessAction}
      />

      {/* ============View Dialog========== */}
      <ViewDailog {...viewDialog} onClose={closeViewDialog} />
    </div>
  );
};

interface Ingredient {
  id: string;
  quantity: string;
}

interface Recpie {
  recipe_name: string;
  recipe_description: string;
  ingredients: Ingredient[];
  preparation_time: string;
  preparation_description: string;
  recipe_image: { file: null | any; prevImage: string; isNew: null | Boolean };
}

const AddEditDailog = (props: any) => {
  const {
    isOpen,
    title,
    onClose,
    isEdit,
    data,
    onSuccess,
    okBtnText = 'Ok',
  } = props;
  const classes = useStyles();
  const formikRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const [ingredientList, setIngredientList] = useState([]);

  const ingredient: Ingredient = {
    id: '',
    quantity: '',
  };

  const initialFormValue: Recpie = {
    recipe_name: '',
    recipe_description: '',
    ingredients: [ingredient],
    preparation_time: '',
    preparation_description: '',
    recipe_image: { file: null, prevImage: '', isNew: null },
  };

  const [initialValue, setInitialValue] = useState({ ...initialFormValue });

  const listIngredients = async () => {
    Post('app/listAllSkinCareIngredient', {})
      .then((res: any) => {
        if (!res.error) {
          let ingredients = res.data.map((data: any) => {
            data.id = data._id;
            return data;
          });
          console.log('listSkinCareIngredient', ingredients);
          setIngredientList(ingredients);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        Snackbar.show(err.message, 'error');
      });
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const files = e.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        formikRef.current.setFieldValue('recipe_image', {
          file,
          prevImage: reader.result,
          isNew: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formikRef.current.setFieldValue('recipe_image', {
        file: null,
        prevImage: '',
        isNew: null,
      });
    }
  };

  const onSubmit = (value: any, helper: any) => {
    try {
      helper.setSubmitting(true);
      const render = async () => {
        const { recipe_image, ...rest } = value;
        const { file, isNew } = recipe_image;
        const PostData = rest;
        if (isNew) {
          PostData.recipe_image = await imageUpload(file);
        } else {
          PostData.recipe_image = file;
        }
        !isEdit && addData(PostData, helper);
        isEdit && editData(PostData, helper);
      };
      render();
    } catch (err) {
      Snackbar.show('Image Upload Failed', 'error');
    }
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addSkinCareRecipe', data)
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
    Post('app/editSkinCareRecipe', data)
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

  const addIngredients = (values: Recpie, setFieldValue: any) => {
    let { ingredients } = values;
    ingredients.push(ingredient);
    setFieldValue('ingredients', ingredients);
  };

  const removeIngredients = (values: Recpie, i: number, setFieldValue: any) => {
    let { ingredients } = values;
    const TempIngredients = ingredients.filter(
      (data: any, index: number) => index !== i
    );
    setFieldValue('ingredients', TempIngredients);
  };

  useEffect(() => {
    if (isEdit) {
      console.log(data)
      const { recipe_image, ingredients, _id, ...rest } = data;
      const EditData = { ...rest, id: _id };
      EditData.ingredients = ingredients.map((data: any) => {
        data.id = data._id;
        return data;
      });
      EditData.recipe_image = {
        file: recipe_image,
        prevImage: recipe_image,
        isNew: false,
      };
      setInitialValue(EditData);
    } else {
      setInitialValue(initialFormValue);
    }
  }, [props]);

  useEffect(() => {
    listIngredients();
  }, []);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth='md'
      aria-labelledby='dialog-title'
      open={isOpen}
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
          recipe_name: Yup.string().trim().required('Recipe name is required'),
          preparation_time: Yup.string()
            .trim()
            .required('Preparation time is required'),
          preparation_description: Yup.string()
            .trim()
            .required('Preparation description is required'),
          ingredients: Yup.array().of(
            Yup.object().shape({
              id: Yup.string().trim().required('Incredients is Required'),
              quantity: Yup.string().trim().required('Quantity is Required'),
            })
          ),
          recipe_image: Yup.object({
            file: Yup.mixed().required('A file is required'),
          }),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          setFieldTouched,
          submitForm,
          isSubmitting,
        }) => (
          <>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Recipe Name'
                    name='recipe_name'
                    variant='outlined'
                    error={Boolean(touched.recipe_name && errors.recipe_name)}
                    helperText={touched.recipe_name && errors.recipe_name}
                    value={values.recipe_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label='Recipe Description'
                    name='recipe_description'
                    variant='outlined'
                    error={Boolean(
                      touched.recipe_description && errors.recipe_description
                    )}
                    helperText={
                      touched.recipe_description && errors.recipe_description
                    }
                    value={values.recipe_description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  {/* <FormControl
                    error={Boolean(touched?.ingredients && errors?.ingredients)}
                  > */}
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

                  {/* <FormHelperText>
                      {touched?.ingredients && errors?.ingredients}
                    </FormHelperText>
                  </FormControl> */}
                </Grid>

                {values?.ingredients?.map((incValue: any, i: number) => (
                  <Grid
                    key={i}
                    item
                    container
                    md={12}
                    xs={12}
                    direction='row'
                    spacing={2}
                  >
                    {console.log('incValue', incValue)}
                    <Grid item md={5} xs={5}>
                      <Autocomplete
                        fullWidth
                        options={ingredientList}
                        value={ingredientList.find(
                          (data: any) => data._id == incValue.id
                        )}
                        getOptionLabel={(option: any) => option.name}
                        getOptionSelected={(option) =>
                          option._id == incValue.id
                        }
                        onChange={(event: any, newValue: any) => {
                          setFieldValue(
                            `ingredients[${i}].id`,
                            newValue?._id || ''
                          );
                        }}
                        onBlur={handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Ingredients'
                            variant='outlined'
                            error={Boolean(
                              touched?.ingredients &&
                              touched?.ingredients[i]?.id &&
                              errors?.ingredients &&
                              (errors?.ingredients[i] as Ingredient)?.id
                            )}
                            helperText={
                              touched?.ingredients &&
                              touched?.ingredients[i]?.id &&
                              errors?.ingredients &&
                              (errors?.ingredients[i] as Ingredient)?.id
                            }
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item md={6} xs={6}>
                      <TextField
                        fullWidth
                        label='Quantity'
                        name={`ingredients[${i}].quantity`}
                        variant='outlined'
                        error={Boolean(
                          touched?.ingredients &&
                          touched?.ingredients[i]?.quantity &&
                          errors?.ingredients &&
                          (errors?.ingredients[i] as Ingredient)?.quantity
                        )}
                        helperText={
                          touched?.ingredients &&
                          touched?.ingredients[i]?.quantity &&
                          errors?.ingredients &&
                          (errors?.ingredients[i] as Ingredient)?.quantity
                        }
                        value={incValue.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>

                    <Grid item md={1} xs={1}>
                      <Button
                        fullWidth
                        className={classes.deleteButton}
                        variant='contained'
                        color='secondary'
                        onClick={() =>
                          removeIngredients(values, i, setFieldValue)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                ))}

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label='Preparation Time'
                    name='preparation_time'
                    variant='outlined'
                    error={Boolean(
                      touched.preparation_time && errors.preparation_time
                    )}
                    helperText={
                      touched.preparation_time && errors.preparation_time
                    }
                    value={values.preparation_time}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                      onChange={(value: any) =>
                        setFieldValue('preparation_description', value)
                      }
                      onBlur={() =>
                        setFieldTouched('preparation_description', true, true)
                      }
                    />

                    <FormHelperText>
                      {touched?.preparation_description &&
                        errors?.preparation_description}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={12} xs={12}>
                  <input
                    name='recipe_image'
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
                    Recipe Image
                  </Button>
                  <FormControl
                    error={Boolean(
                      touched?.recipe_image?.file && errors?.recipe_image?.file
                    )}
                  >
                    <FormHelperText>
                      {touched?.recipe_image?.file &&
                        errors?.recipe_image?.file}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={12} xs={12}>
                  {values.recipe_image?.prevImage && (
                    <img
                      className={classes.imageView}
                      src={values.recipe_image?.prevImage}
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
  );
};

const ViewDailog = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);

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
        <Grid container spacing={3}>
          <Grid item justify='flex-end' md={2} xs={12}>
            <Avatar
              className={classes.avatarStyles}
              variant='square'
              src={formValue?.recipe_image}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <Typography variant='h6' align='left'>
              {formValue?.recipe_name}
            </Typography>
            <Typography
              variant='subtitle1'
              align='left'
              style={{ marginTop: '5px', color: '#E7B000' }}
            >
              {formValue?.recipe_description}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography variant='h6' align='left' style={{ color: '#41A58D' }}>
              Ingredients
            </Typography>
          </Grid>
          <Grid container>
            {formValue?.ingredients?.length !== 0 ? (
              formValue?.ingredients?.map((value: any, index: any) => {
                return (
                  <Grid
                    className={classes.adjustmentTop}
                    key={index}
                    item
                    xs={6}
                    md={4}
                  >
                    <Avatar
                      className={classes.ingredientsAvatarStyle}
                      variant='circular'
                      src={value.image}
                    />
                    <Typography variant='h6' align='center'>
                      {value.name}
                    </Typography>
                    <Typography
                      className={classes.adjustmentTop}
                      variant='subtitle1'
                      align='center'
                    >
                      {value.description.length >= 25
                        ? `${value.description.substring(0, 30)}...`
                        : ''}
                    </Typography>
                  </Grid>
                );
              })
            ) : (
              <Grid xs={12}>
                <Typography variant='subtitle1' align='center'>
                  No Ingredients
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography variant='h6' align='left' style={{ color: '#41A58D' }}>
              Preparation
            </Typography>
            <Typography
              className={classes.adjustmentTop}
              variant='body2'
              align='left'
            >
              <TimerIcon style={{ fontSize: '13px' }} /> {'  '}
              {formValue?.preparation_time}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: formValue?.preparation_description,
                }}
              ></div>
            </div>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SkinCareRecipe;

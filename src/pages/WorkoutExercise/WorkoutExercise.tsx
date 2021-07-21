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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
import { Formik, getIn, useFormikContext, FieldArray } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import TipTapEditor from '../../components/TipTapEditor/TipTapEditor';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import { uploadNewImage } from '../../utils/CloudinaryUtils';
import { imageUpload } from '../../utils/FirebaseUtils';
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
  workouttermsavatar: {
    width: '100%',
    height: '100%',
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
  htmlContent: {
    '& ul': {
      paddingLeft: '1.2rem',
    },
    '& p': {
      textAlign: 'justify',
    },
  },
}));

const WorkoutExercise = () => {
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

  const listWorkOutExercise = async () => {
    setLoading(true);
    Post('app/listWorkout', stateData)
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setDataList(res.data);
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

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
  };

  const setElipsis = (text: any) => {
    return text?.length >= 25 ? `${text.substring(0, 40)}...` : text;
  };

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      isEdit: false,
      title: 'Add Exercise',
      okBtnText: 'Save',
    }));
  };

  const openEditDialog = (data: any) => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      isEdit: true,
      data,
      title: 'Edit Exercise',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Workout Exerice',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteWorkout', { id: data._id })
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
    listWorkOutExercise();
    closeAddEditDialog();
  };

  useEffect(() => {
    listWorkOutExercise();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Workout Exercise' />

      {/* =======Header====== */}
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Workout Exercise
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
      {/* <Grid container spacing={3}>
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
      </Grid> */}

      {/* ========Table With Pagination========= */}
      <Card className={classes.tabCard}>
        <CardContent className={classes.content}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='center'>Workout Image</TableCell>
                  <TableCell align='center'>Workout Name</TableCell>
                  <TableCell align='center'>Workout Description</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  dataList.map((data: any, index: number) => (
                    <TableRow hover key={index}>
                      <TableCell align='center'>
                        {stateData.page_limit * (stateData.page_no - 1) +
                          index +
                          1}
                      </TableCell>
                      <TableCell align='center'>
                        <div className={classes.jCenter}>
                          <Avatar variant='square' src={data?.workout_image?.url} />
                        </div>
                      </TableCell>
                      <TableCell align='center'>{data?.workout_name}</TableCell>
                      <TableCell align='center'>
                        <Tooltip title={data?.workout_description}>
                          <span>{setElipsis(data?.workout_description)}</span>
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

interface Workoutterms {
  name: string;
  image: { file: null | any; prevImage: string | any; isNew: null | Boolean };
  description: any;
}

interface Equipments {
  id: string | any;
}

interface Exercise {
  workout_name: string;
  workout_image: { file: null | any; prevImage: string; isNew: null | Boolean };
  workout_description: string;
  workout_thumbnail: {
    file: null | any;
    prevImage: string;
    isNew: null | Boolean;
  };
  workout_type: string;
  workout_terms: Workoutterms[];
  required_equipments: Equipments[];
  how_to_do: string;
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
  const thumbnailImageRef = useRef<any>(null);
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const [equipmentList, setEquipmentList] = useState<any>([]);

  const workoutTerms: Workoutterms = {
    name: '',
    image: { file: null, prevImage: '', isNew: null },
    description: '',
  };

  const equipments: Equipments = {
    id: '',
  };

  const initialFormValue: Exercise = {
    workout_name: '',
    workout_image: { file: null, prevImage: '', isNew: null },
    workout_description: '',
    workout_thumbnail: { file: null, prevImage: '', isNew: null },
    workout_type: '',
    workout_terms: [workoutTerms],
    required_equipments: [equipments],
    how_to_do: '',
  };

  const [initialValue, setInitialValue] = useState({ ...initialFormValue });

  const listIngredients = async () => {
    Post('app/listAllEquipment', {})
      .then((res: any) => {
        if (!res.error) {
          let getequipmentList = res.data.map((data: any) => {
            data.id = data._id;
            return data;
          });
          setEquipmentList(getequipmentList);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
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
        formikRef.current.setFieldValue('workout_image', {
          file,
          prevImage: reader.result,
          isNew: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formikRef.current.setFieldValue('workout_image', {
        file: null,
        prevImage: '',
        isNew: null,
      });
    }
  };

  const onThumbnailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const files = e.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        formikRef.current.setFieldValue('workout_thumbnail', {
          file,
          prevImage: reader.result,
          isNew: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formikRef.current.setFieldValue('workout_thumbnail', {
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
        const { workout_image, workout_thumbnail, workout_terms, ...rest } = value;

        const postData = rest;
        const TermPromiseArray = Promise.all(workout_terms.map(({ image, ...rest }: any) => uploadNewImage(image).then((ImgRes: any) => ({ image: ImgRes, ...rest }))))

        const [ImgRes, ImgTumpRes, TermRes] = await Promise.all([uploadNewImage(workout_image), uploadNewImage(workout_thumbnail), TermPromiseArray])

        postData.workout_image = ImgRes
        postData.workout_thumbnail = ImgTumpRes
        postData.workout_terms = TermRes

        !isEdit && addData(postData, helper);
        isEdit && editData(postData, helper);

      };
      render();
    } catch (err) {
      Snackbar.show('Image Upload Failed', 'error');
    }
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    console.log(data)
    setSubmitting(true);
    Post('app/addWorkout', data)
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
    Post('app/editWorkout', data)
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

  const handleEquipmentChange = (event: any, newValue: any) => {
    let sampleDatas = newValue.map((datas: any) => {
      return {
        id: datas._id,
      };
    });
    formikRef.current.setFieldValue('required_equipments', sampleDatas);
  };

  const addIngredients = (values: Exercise, push: any) => {
    let { workout_terms } = values;
    push(workoutTerms);
  };

  useEffect(() => {
    if (isEdit) {
      const { required_equipments, workout_terms, _id, workout_thumbnail, workout_image, ...rest } = data;
      const editData = { ...rest, id: _id };
      editData.required_equipments = required_equipments.map((data: any) => {
        // data.id = data._id;
        return {
          id: data._id,
        };
      });

      const EquipmentIds = equipmentList.map(({ _id }: any) => _id)
      editData.required_equipments = required_equipments.filter(({ _id }: any) => EquipmentIds.includes(_id)).map(({ _id }: any) => ({ id: _id }));
      editData.workout_terms = workout_terms.map((item: any) => {
        return {
          name: item.name,
          image: { file: item.image, prevImage: item.image?.url, isNew: false },
          description: item.description,
        };
      });
      editData.workout_thumbnail = {
        file: workout_thumbnail,
        prevImage: workout_thumbnail?.url,
        isNew: false,
      };
      editData.workout_image = {
        file: workout_image,
        prevImage: workout_image?.url,
        isNew: false,
      };
      setInitialValue(editData);
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
          workout_name: Yup.string()
            .trim()
            .required('Workout name is required'),
          workout_image: Yup.object({
            file: Yup.mixed().required('A file is required'),
          }),
          workout_description: Yup.string()
            .trim()
            .max(250, 'Must be 250 characters or less')
            .required('Workout description is required'),
          workout_thumbnail: Yup.object({
            file: Yup.mixed().required('A file is required'),
          }),
          workout_type: Yup.string()
            .trim()
            .required('Workout type is required'),
          workout_terms: Yup.array().of(
            Yup.object().shape({
              name: Yup.string()
                .trim()
                .required('Workout term name is Required'),
              image: Yup.object({
                file: Yup.mixed().required('required'),
              }),
              description: Yup.string()
                .max(250, 'Must be 250 characters or less')
                .required('Workout description is Required'),
            })
          ),
          required_equipments: Yup.array().of(
            Yup.object().shape({
              id: Yup.string().trim().required(' Equipments is Required'),
            })
          ),
          how_to_do: Yup.string().trim().required('Steps is required'),
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
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Workout name'
                    name='workout_name'
                    variant='outlined'
                    error={Boolean(touched.workout_name && errors.workout_name)}
                    helperText={touched.workout_name && errors.workout_name}
                    value={values.workout_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label='Workout description'
                    name='workout_description'
                    variant='outlined'
                    error={Boolean(
                      touched.workout_description && errors.workout_description
                    )}
                    helperText={
                      touched.workout_description && errors.workout_description
                    }
                    value={values.workout_description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label='Workout type'
                    name='workout_type'
                    variant='outlined'
                    error={Boolean(touched.workout_type && errors.workout_type)}
                    helperText={touched.workout_type && errors.workout_type}
                    value={values.workout_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <FieldArray name='workout_terms' validateOnChange>
                  {({push, remove})=>(
                    <>
                      <Grid item md={12} xs={12}>
                        <Button
                          fullWidth
                          className={classes.themeButton}
                          variant='contained'
                          color='default'
                          onClick={() => addIngredients(values, push)}
                          endIcon={<ControlPointIcon />}
                        >
                          Add workout terms
                        </Button>
                      </Grid>
                    {values?.workout_terms?.map((workoutValues: any, index: any) => <WorkoutTerms key={index} index={index} />)}
                    </>
                  )}
                </FieldArray>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    multiple
                    id='combo-box-demo'
                    options={equipmentList}
                    value={equipmentList.filter((data: any) =>
                      values.required_equipments
                        .map(({ id }: any) => id)
                        .includes(data._id)
                    )}
                    onChange={handleEquipmentChange}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Equipments'
                        name='required_equipments'
                        variant='outlined'
                        error={Boolean(
                          touched?.required_equipments &&
                          touched?.required_equipments[0]?.id &&
                          errors?.required_equipments &&
                          (errors?.required_equipments[0] as any)?.id
                        )}
                        helperText={
                          touched?.required_equipments &&
                          touched?.required_equipments[0]?.id &&
                          errors?.required_equipments &&
                          (errors?.required_equipments[0] as any)?.id
                        }
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched?.how_to_do && errors?.how_to_do)}
                  >
                    <TipTapEditor
                      value={values.how_to_do}
                      onChange={(value: any) =>
                        setFieldValue('how_to_do', value)
                      }
                      onBlur={() => setFieldTouched('how_to_do', true, true)}
                    />

                    <FormHelperText>
                      {touched?.how_to_do && errors?.how_to_do}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={6}>
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
                    Workout image
                  </Button>
                  <FormControl
                    error={Boolean(
                      touched?.workout_image?.file &&
                      errors?.workout_image?.file
                    )}
                  >
                    <FormHelperText>
                      {touched?.workout_image?.file &&
                        errors?.workout_image?.file}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={6}>
                  <input
                    name='recipe_image'
                    ref={thumbnailImageRef}
                    type='file'
                    accept='.jpg,.png,jpeg'
                    onChange={onThumbnailImageChange}
                    onBlur={handleBlur}
                    hidden
                  />
                  <Button
                    fullWidth
                    className={classes.themeButton}
                    variant='contained'
                    color='default'
                    onClick={() => thumbnailImageRef.current.click()}
                    startIcon={<CloudUploadIcon />}
                  >
                    Workout Thumbnail
                  </Button>
                  <FormControl
                    error={Boolean(
                      touched?.workout_thumbnail?.file &&
                      errors?.workout_thumbnail?.file
                    )}
                  >
                    <FormHelperText>
                      {touched?.workout_thumbnail?.file &&
                        errors?.workout_thumbnail?.file}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={6}>
                  {values.workout_image?.prevImage && (
                    <img
                      className={classes.imageView}
                      src={values.workout_image?.prevImage}
                    />
                  )}
                </Grid>

                <Grid item md={6} xs={6}>
                  {values.workout_thumbnail?.prevImage && (
                    <img
                      className={classes.imageView}
                      src={values.workout_thumbnail?.prevImage}
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

const WorkoutTerms = (props: any) => {
  const classes = useStyles();
  const FormikContext = useFormikContext();
  const { values, errors, touched, setFieldValue, handleBlur, handleChange }: any = FormikContext;
  // const [{ values, errors, touched, setFieldValue, handleBlur, handleChange }, setFormikContext]: any = useState(FormikContext);
  const { index } = props;
  const imgRef = useRef<any>(null);
  console.log(errors)
  const FieldName = `workout_terms[${index}]`;
  const FieldValue = getIn(values, `workout_terms[${index}]`);
  const FieldError = getIn(errors, `workout_terms[${index}]`);
  const FieldTouched = getIn(touched, `workout_terms[${index}]`);

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
    const OldTerms = getIn(values, 'workout_terms');
    const Terms = OldTerms.filter((d: any, i: number) => i != index);
    setFieldValue('workout_terms', Terms);
  }

  // useEffect(() => {
  //   setFormikContext(FormikContext)
  // }, [props])

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
          label='Workout terms name'
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
          label='Workout terms description'
          name={`${FieldName}.description`}
          variant='outlined'
          error={Boolean(FieldTouched?.description && FieldError?.description)}
          helperText={FieldTouched?.description && FieldError?.description}
          value={FieldValue.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item md={1} xs={4}>
        {values?.workout_terms.length > 1 && (
          <Button
            fullWidth
            className={classes.deleteButton}
            variant='contained'
            color='secondary'
            onClick={() => removeTerm()}
          >
            <DeleteIcon />
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

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
            src={formValue?.workout_image?.url}
            alt={'Workout image'}
            className={classes.imageView}
          />
        </div>
        <Typography variant='h5' align='left' className={classes.textPrimary}>{formValue?.workout_name}</Typography>

        <Grid
          container
          spacing={2}
          className={classes.ingrdientsGridMain}
          justify='center'
        >
          {formValue?.workout_terms?.map((value: any, index: any) => (
            <Grid key={index} item xs={4} md={3}>
              <Avatar
                className={classes.ingredientsAvatarRoot}
                src={value?.image?.url}
              />
              <Typography variant='h6' align='center'>
                {value?.name}
              </Typography>
              <Typography variant='subtitle2' align='center'>
                {value.description.length >= 25
                  ? `${value.description.substring(0, 30)}...`
                  : value.description}
              </Typography>
            </Grid>
          ))}
          {formValue?.workout_terms?.length == 0 && (
            <Grid item xs={12} md={12} className={classes.noIngredientsText}>
              <div>No workout terms added</div>
            </Grid>
          )}
        </Grid>
        <Typography variant='h6' align='left' className={classes.textSecondary}>{formValue?.workout_description}</Typography>



        <Typography variant='h5' align='left' style={{ color: '#41A58D' }} className={classes.textPrimary}>
          Equipments
        </Typography>

        <Grid
          container
          spacing={2}
          className={classes.ingrdientsGridMain}
          justify='center'
        >
          {formValue?.required_equipments?.map((value: any, index: any) => (
            <Grid key={index} item xs={4} md={3}>
              <Avatar
                className={classes.ingredientsAvatarRoot}
                src={value?.image?.url}
              />
              <Typography variant='h6' align='center'>
                {value?.name}
              </Typography>
              {/* <Typography variant='subtitle2' align='center'>
                {value.description.length >= 25
                  ? `${value.description.substring(0, 30)}...`
                  : value.description}
              </Typography> */}
            </Grid>
          ))}
          {formValue?.required_equipments?.length == 0 && (
            <Grid item xs={12} md={12} className={classes.noIngredientsText}>
              <div>No Equipments Added</div>
            </Grid>
          )}
        </Grid>

        <Typography variant='h6' align='left' style={{ color: '#41A58D' }}>
          How to do
        </Typography>

        <Grid container>
          <Grid item xs={12} md={12} className={classes.htmlContentGrid}>
            <div
              className={classes.htmlContent}
              dangerouslySetInnerHTML={{ __html: formValue?.how_to_do }}
            />
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

export default WorkoutExercise;

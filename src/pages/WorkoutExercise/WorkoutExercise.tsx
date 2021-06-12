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

  console.log(dataList);

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
                          <Avatar variant='square' src={data?.workout_image} />
                        </div>
                      </TableCell>
                      <TableCell align='center'>{data?.workout_name}</TableCell>
                      <TableCell align='center'>
                        <Tooltip title={data?.recipe_description}>
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
  const avatharimgRef = useRef<any>(null);
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

  const onAvatarImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    e.persist();
    const files = e.target.files;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        formikRef.current.setFieldValue(`workout_terms[${index}].image`, {
          file,
          prevImage: reader.result,
          isNew: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formikRef.current.setFieldValue('workout_terms', {
        workoutTermsName: '',
        image: { file: null, prevImage: '', isNew: null },
        description: '',
      });
    }
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
        const { workout_image, workout_thumbnail, workout_terms, ...rest } =
          value;
        const { file, isNew } = workout_image;
        const workoutterms = workout_terms.map(async (data: any) => {
          let getWorkoutImageUrl = await imageUpload(data.image.file);
          data.image = getWorkoutImageUrl;
          return data;
        });
        const PostData = rest;
        let tempdatas = Promise.all(workoutterms).then(
          (dataWithImageUrl: any) => {
            PostData.workout_terms = dataWithImageUrl;
          }
        );
        if (isNew) {
          PostData.workout_image = await imageUpload(file);
          PostData.workout_thumbnail = await imageUpload(
            workout_thumbnail.file
          );
        } else {
          PostData.workout_image = file;
          PostData.workout_thumbnail = workout_thumbnail.file;
          PostData.workoutterms = workoutterms;
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
    console.log(data);
    setSubmitting(true);
    Post('app/addWorkout', data)
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

  const addIngredients = (values: Exercise, setFieldValue: any) => {
    let { workout_terms } = values;
    workout_terms.push(workoutTerms);
    setFieldValue('workout_terms', workout_terms);
  };

  const removeIngredients = (
    values: Exercise,
    i: number,
    setFieldValue: any
  ) => {
    let { workout_terms } = values;
    const TempIngredients = workout_terms.filter(
      (data: any, index: number) => index !== i
    );
    setFieldValue('workout_terms', TempIngredients);
  };

  useEffect(() => {
    if (isEdit) {
      console.log(data);
      const {
        required_equipments,
        workout_terms,
        _id,
        workout_thumbnail,
        workout_image,
        ...rest
      } = data;
      const editData = { ...rest, id: _id };
      editData.required_equipments = required_equipments.map((data: any) => {
        // data.id = data._id;
        return {
          id: data._id,
        };
      });
      editData.workout_terms = workout_terms.map((item: any) => {
        return {
          name: item.name,
          image: { file: item.image, prevImage: item.image, isNew: false },
          description: item.description,
        };
      });
      editData.workout_thumbnail = {
        file: workout_thumbnail,
        prevImage: workout_thumbnail,
        isNew: false,
      };
      editData.workout_image = {
        file: workout_image,
        prevImage: workout_image,
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
                file: Yup.mixed().required('A file is required'),
              }),
              description: Yup.string()
                .trim()
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
            {console.log(errors)}
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

                <Grid item md={12} xs={12}>
                  <Button
                    fullWidth
                    className={classes.themeButton}
                    variant='contained'
                    color='default'
                    onClick={() => addIngredients(values, setFieldValue)}
                    endIcon={<ControlPointIcon />}
                  >
                    Add workout terms
                  </Button>
                </Grid>

                {values?.workout_terms?.map(
                  (workoutValues: any, index: any) => (
                    <Grid
                      key={index}
                      item
                      container
                      md={12}
                      xs={12}
                      direction='row'
                      spacing={2}
                    >
                      <Grid item md={1} xs={12}>
                        <input
                          // name={`workout_terms[${index}].image`}
                          ref={avatharimgRef}
                          type='file'
                          accept='.jpg,.png,jpeg'
                          onChange={(e) => onAvatarImageChange(e, index)}
                          onBlur={handleBlur}
                          hidden
                        />
                        <Avatar
                          className={classes.workouttermsavatar}
                          variant='square'
                          onClick={() => avatharimgRef.current.click()}
                          src={workoutValues?.image?.prevImage}
                        />
                      </Grid>

                      <Grid item md={5} xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          label='Workout terms name'
                          name={`workout_terms[${index}].name`}
                          variant='outlined'
                          error={Boolean(
                            touched?.workout_terms &&
                              touched?.workout_terms[index]?.name &&
                              errors?.workout_terms &&
                              (errors?.workout_terms[index] as any)?.name
                          )}
                          helperText={
                            touched?.workout_terms &&
                            touched?.workout_terms[index]?.name &&
                            errors?.workout_terms &&
                            (errors?.workout_terms[index] as any)?.name
                          }
                          value={workoutValues.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item md={5} xs={8}>
                        <TextField
                          fullWidth
                          multiline
                          label='Workout terms description'
                          name={`workout_terms[${index}].description`}
                          variant='outlined'
                          error={Boolean(
                            touched?.workout_terms &&
                              touched?.workout_terms[index]?.description &&
                              errors?.workout_terms &&
                              (errors?.workout_terms[index] as any)?.description
                          )}
                          helperText={
                            touched?.workout_terms &&
                            touched?.workout_terms[index]?.description &&
                            errors?.workout_terms &&
                            (errors?.workout_terms[index] as any)?.description
                          }
                          value={workoutValues.description}
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
                          onClick={() =>
                            removeIngredients(values, index, setFieldValue)
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  )
                )}

                <Grid item md={12} xs={12}>
                  <Autocomplete
                    multiple
                    id='combo-box-demo'
                    options={equipmentList}
                    value={equipmentList.filter((data: any) => values.required_equipments.map(({ id }: any) => id).includes(data._id))}
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

const ViewDailog = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);

  useEffect(() => {
    setFormValue(data);
  }, [props]);

  console.log(formValue);

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
              src={formValue?.workout_image}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <Typography variant='h6' align='left'>
              {formValue?.workout_name}
            </Typography>
            <Typography
              variant='subtitle1'
              align='left'
              style={{ marginTop: '5px', color: '#E7B000' }}
            >
              {formValue?.workout_description}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography variant='h6' align='left' style={{ color: '#41A58D' }}>
              Workout Terms
            </Typography>
          </Grid>
          <Grid container>
            {formValue?.workout_terms?.length !== 0 ? (
              formValue?.workout_terms?.map((value: any, index: any) => {
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
                      variant='square'
                      src={value?.image}
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
                        : value.description}
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
              Equipments
            </Typography>
          </Grid>
          <Grid container>
            {formValue?.required_equipments?.length !== 0 ? (
              formValue?.required_equipments?.map((value: any, index: any) => {
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
                      variant='square'
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
                        : value.description}
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
              How to do
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: formValue?.how_to_do,
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

export default WorkoutExercise;

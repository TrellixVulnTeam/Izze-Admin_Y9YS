import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Avatar, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, FormControl, FormHelperText, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, TextField, Button, CircularProgress, } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Page from '../../components/Page/Page';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import useConfModel from '../../hook/useConfModel';
import { uploadNewImage } from '../../utils/CloudinaryUtils';

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
}));

const SkinCareIngredients = () => {
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

  const listIngredients = async () => {
    setLoading(true);
    Post('app/listSkinCareIngredient', stateData)
      .then((res: any) => {
        console.log('listSkinCareIngredient', res);
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
      title: 'Add Ingredient',
      okBtnText: 'Save',
    }));
  };

  const openEditDialog = (data: any) => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      isEdit: true,
      data,
      title: 'Edit Ingredient',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Ingredient',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteSkinCareIngredient', { id: data._id })
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
    listIngredients();
    closeAddEditDialog();
  };

  useEffect(() => {
    listIngredients();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Ingredients' />

      {/* =======Header====== */}
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Ingredients
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
                        {stateData.page_limit * (stateData.page_no - 1) +
                          index +
                          1}
                      </TableCell>
                      <TableCell align='center'>
                        <div className={classes.jCenter}>
                          <Avatar variant='square' src={data?.image?.url} />
                        </div>
                      </TableCell>
                      <TableCell align='center'>{data?.name}</TableCell>
                      <TableCell align='center'>
                        <Tooltip title={data?.description}>
                          <span>{setElipsis(data?.description)}</span>
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
  const initialFormValue = {
    name: '',
    description: '',
    image: { file: null, prevImage: '', isNew: null },
  };

  const classes = useStyles();
  const formikRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const [initialValue, setInitialValue] = useState({ ...initialFormValue });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const files = e.target.files;
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
        const { image, ...rest } = value;
        const PostData = rest;

        PostData.image = await uploadNewImage(image);

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
    Post('app/addSkinCareIngredient', data)
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
    Post('app/editSkinCareIngredient', data)
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

  useEffect(() => {
    if (isEdit) {
      const { image, _id, ...rest } = data;
      const EditData = { ...rest, id: _id };
      EditData.image = { file: image, prevImage: image?.url, isNew: false };
      setInitialValue(EditData);
    } else {
      setInitialValue(initialFormValue);
    }
  }, [props]);

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
          name: Yup.string().trim().required('Name is required'),
          description: Yup.string().trim().max(250, 'Must be 250 characters or less').notRequired(),
          image: Yup.object({
            file: Yup.mixed().required('A file is required'),
          }),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitForm,
          isSubmitting,
        }) => (
          <>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='name'
                    variant='outlined'
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    label='Description'
                    name='description'
                    variant='outlined'
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
                    Upload
                  </Button>
                  <FormControl
                    error={Boolean(touched?.image?.file && errors?.image?.file)}
                  >
                    <FormHelperText>
                      {touched?.image?.file && errors?.image?.file}
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
          <Grid item md={12} xs={12}>
            {formValue?.name}
          </Grid>
          <Grid item md={12} xs={12}>
            {formValue?.description}
          </Grid>
          <Grid item md={12} xs={12}>
            {formValue?.image && (
              <img className={classes.imageView} src={formValue?.image?.url} />
            )}
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

export default SkinCareIngredients;

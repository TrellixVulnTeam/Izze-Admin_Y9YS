import React, { useRef, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, FormControl, FormHelperText, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Divider, Typography, Tabs, ListItemSecondaryAction } from '@material-ui/core';
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
import TipTapEditor from '../../components/TipTapEditor/TipTapEditor';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useEffect } from 'react';
import LikeImage from '../../assets/Images/like.png'
import CommentImage from '../../assets/Images/comment.png';
import CheckIcon from '@material-ui/icons/Check';
import { promises } from 'stream';
import { uploadImageCloudinary } from '../../utils/CloudinaryUtils';
import moment from 'moment'


const useStyle = makeStyles((theme: any) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  greenColor: {
    color: theme.palette.green.main,
  },
  themeButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  deleteButton: {
    width: '100%',
    height: '50px',
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
      wordBreak: 'break-word'
    },
  },
  likeCountImg: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  noCommentsText: {
    textAlign: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  blogTypeStyle : {
    backgroundColor : '#F2805E',
    color : 'white',
    padding : '5px',
    borderRadius : '5px',
    fontSize : '14px',
    marginLeft : '10px'
  },
  rejectButtonStyle : { 
    backgroundColor: 'red', 
    color: 'white', 
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: 'red',
    }, 
  }
}));

const AdminUser = () => {
  const classes = useStyle();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10, name:'' });
  const [pageCount, setPageCount] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDialog, setViewDialog] = React.useState({
    isOpen: false,
    title: '',
    data: {},
  });
  const [addEditDialog, setAddEditDialog] = useState({
    isOpen: false,
    title: '',
    okBtnText: '',
    isEdit: false,
    data: {},
  });

  const listBlog = async () => {
    setLoading(true);
    Post('app/listAdminUser', stateData)
      .then((res: any) => {
        console.log('listAdminUser', res);
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

  const searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const Name = event.target.name
    const Value = event.target.value
    setStateData((prevState: any) => ({ ...prevState, [Name]: Value }));
  };

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Admin User',
      isEdit: false,
      okBtnText: 'Save',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Admin User',
    }));
  };

  const closeAddEditDialog = () => {
    setAddEditDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
  };

  const onSuccessAction = () => {
    listBlog();
    closeAddEditDialog();
  };

  const closeViewDialog = () => {
    setViewDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  useEffect(() => {
    listBlog();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Admin Users' />
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Admin Users
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
              name = 'name'
              value = {stateData?.name}
              variant='outlined'
              onChange={searchChange}
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
                  <TableCell align='center'>Image</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell align='center'>User Type</TableCell>
                  <TableCell align='center'>Action</TableCell>
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
                      <TableCell align='center'>{data?.email}</TableCell>
                      <TableCell align='center'>{data?.user_type}</TableCell>
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
                          {/* <Tooltip title='Edit' arrow>
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
                          </Tooltip> */}
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

      {addEditDialog.isOpen && <AddEditModel {...addEditDialog} onClose={closeAddEditDialog} onSuccess={onSuccessAction} />}
      {viewDialog.isOpen && <ViewModel {...viewDialog} onClose={closeViewDialog} onReload={() => listBlog()} />}

    </div>
  )
}

const initialFormValue = {
  email: '',
  password: '',
  name: '',
  image: { file: null, prevImage: '', isNew: null },
  user_type : ''
}
const AdminRoles = [
 {id : 'ADMIN', name : 'Admin'},
 {id : 'NUTRITION', name : 'Nutrition'},
 {id : 'SKINCARE', name : 'Skincare'},
 {id : 'WORKOUT', name : 'Workout'},
 {id : 'CUSTOMERCARE', name : 'Costomer Care'}
]

export const AddEditModel = (props: any) => {
  const classes = useStyle()
  const { isEdit, isOpen, okBtnText = 'OK', onClose, data, title, onSuccess } = props;
  const [initialValue, setInitialValue] = useState({ ...initialFormValue });
  const formikRef = React.useRef<any>(null);
  const imageRef = React.useRef<any>(null);
  const imageThumbnailRef = React.useRef<any>(null);
  const Snackbar = useSnackbar();
  const { Post } = useService();

  const uploadNewImage = (imageData: any) => {
    const { isNew, file } = imageData
    if (isNew) {
      return uploadImageCloudinary(file)
    } else {
      return Promise.resolve(file)
    }
  }

  const onSubmit = (value: any, helper: any) => {
    try {
      helper.setSubmitting(true);
      const render = async () => {
        const { image, ...rest } = value;
        const PostData = rest;
        const [ImgRes] = await Promise.all([uploadNewImage(image)])

        PostData.image = ImgRes

        !isEdit && addData(PostData, helper);
        // isEdit && editData(PostData, helper);
      };
      render();
    } catch (err) {
      helper.setSubmitting(false);
      Snackbar.show('Image Upload Failed', 'error');
    }
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addAdminUser', data)
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

  // const editData = (data: any, { setSubmitting, resetForm }: any) => {
  //   setSubmitting(true);
  //   Post('app/editBlog', data)
  //     .then((res: any) => {
  //       Snackbar.show(res.message, 'success');
  //       setSubmitting(false);
  //       resetForm();
  //       onSuccess();
  //     })
  //     .catch((err: any) => {
  //       Snackbar.show(err.message, 'error');
  //     });
  // };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files = event.target.files;
    const FieldName = event.target.name;
    if (files && files.length != 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.onloadend = () => {
        formikRef.current.setFieldValue(FieldName, {
          file,
          prevImage: reader.result,
          isNew: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formikRef.current.setFieldValue(FieldName, {
        file: null,
        prevImage: '',
        isNew: null,
      });
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { image, image_thumbnail, _id, ...rest } = data;
      const EditData = { ...rest, id: _id };
      EditData.image = { file: image, prevImage: image.url, isNew: false };
      EditData.image_thumbnail = { file: image_thumbnail, prevImage: image_thumbnail.url, isNew: false };
      setInitialValue(EditData);
    } else {
      setInitialValue(initialFormValue);
    }
  }, [props]);

  return (
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
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
            email: Yup.string().trim().required('Email is required').email(),
            password: Yup.string().trim().required('Password is required'),
            name: Yup.string().trim().required('Name is required'),
            image: Yup.object({ file: Yup.mixed().required('A file is required') }),
            user_type: Yup.string().trim().required('User type is required'),
        })}
      >
        {({ values, errors, touched, handleBlur, handleChange, setFieldValue, submitForm, setFieldTouched, isSubmitting, }) => (
          <>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    name='email'
                    variant='outlined'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Password'
                    name='password'
                    variant='outlined'
                    type = 'password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='name'
                    variant='outlined'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    options={AdminRoles}
                    value={AdminRoles.find((data: any) => data.id == values.user_type)}
                    getOptionLabel={(option: any) => option.name}
                    onChange={(event: any, newValue: any) => {
                      setFieldValue('user_type', newValue?.id || '');
                    }}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='User Type'
                        name = 'user_type'
                        variant='outlined'
                        error={Boolean(touched.user_type && errors.user_type)}
                        helperText={touched.user_type && errors.user_type}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
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
  )
}

export const ViewModel = (props: any) => {
  const { isOpen, title, onClose, data, onReload } = props;
  const classes = useStyle();
  const [formValue, setFormValue] = useState(data);

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
            src={formValue?.image?.url}
            className={classes.imageView}
          />
        </div>
        <Card>
          <Table>
            <TableBody>
              <TableRow >
                <TableCell>Name</TableCell>
                <TableCell>{formValue?.name}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Email</TableCell>
                <TableCell>{formValue?.email}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>User Type</TableCell>
                <TableCell>{formValue?.user_type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>

    </Dialog>
  )
}

export default AdminUser

import React, { useRef, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, FormControl, FormHelperText, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Divider, Typography, Tabs, ListItemSecondaryAction, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
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
import MobxObserver from '../../Mobx/Helpers/MobxObserver';
import { useStore } from '../../Mobx/Helpers/UseStore';
import { toJS } from 'mobx';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



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
  blogTypeStyle: {
    backgroundColor: '#F2805E',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    fontSize: '14px',
    marginLeft: '10px',
    boxShadow: 'none'
  },
  rejectButtonStyle: {
    backgroundColor: 'red',
    color: 'white',
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  accordionRoot: {
    paddingLeft: theme.spacing(7),
    '&:before': {
      height: 0
    }
  },
  accordionExpanded: {
    marginTop: '0 !important',
  },
  accordionDetailsRoot: {
    display: 'unset',
    padding: 0
  },
  accordionSummaryRoot: {
    display: 'none',
  },
  width100: {
    width: '100%'
  },
  replyButtons: {
    padding: 0,
    fontSize: "0.7rem",
    borderRadius: 'unset'
  },
}));

const Blogs = () => {
  const classes = useStyle();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10 });
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
    Post('app/listBlog', stateData)
      .then((res: any) => {
        console.log('listBlog', res);
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

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Blog Plan',
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
      title: 'Edit Blog Plan',
      okBtnText: 'Save',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Blog Content',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteBlog', { id: data._id })
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
      <Page title='Blogs' />
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Blogs
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

      <Card className={classes.tabCard}>
        <CardContent className={classes.content}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='center'>Image</TableCell>
                  <TableCell align='center'>Title</TableCell>
                  <TableCell align='center'>Like Count</TableCell>
                  <TableCell align='center'>Comment Count</TableCell>
                  <TableCell align='center'>Unapprove Comment Count</TableCell>
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
                      <TableCell align='center'>{data?.title}</TableCell>
                      <TableCell align='center'>{data?.like_count}</TableCell>
                      <TableCell align='center'>{data?.comment_count}</TableCell>
                      <TableCell align='center'>{data?.comment_unread_count}</TableCell>
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

      {addEditDialog.isOpen && <AddEditModel {...addEditDialog} onClose={closeAddEditDialog} onSuccess={onSuccessAction} />}
      {viewDialog.isOpen && <ViewModel {...viewDialog} onClose={closeViewDialog} onReload={() => listBlog()} />}

    </div>
  )
}

const initialFormValue = {
  description: '',
  blog_type: '',
  title: '',
  image: { file: null, prevImage: '', isNew: null },
  image_thumbnail: { file: null, prevImage: '', isNew: null },
}
const BlogTypes = [
  { id: 'NUTRITION', name: 'Nutririon' },
  { id: 'MEAL', name: 'Meal' },
  { id: 'SKINCARE', name: 'Skincare' },
  { id: 'WORKOUT', name: 'Workout' }
]

const getBlogDrop = (user_type: string) => {
  switch (user_type) {
    case "SKINCARE":
      return [{ id: 'SKINCARE', name: 'Skincare' }];
      break;
    case "WORKOUT":
      return [{ id: 'WORKOUT', name: 'Workout' }];
      break;
    case "NUTRITION":
      return [{ id: 'NUTRITION', name: 'Nutririon' }, { id: 'MEAL', name: 'Meal' },];
      break;
    case "CUSTOMERCARE":
      return [];
      break;
    default:
      return BlogTypes;
  }
}

export const AddEditModel = MobxObserver((props: any) => {
  const classes = useStyle()
  const { UserStore } = useStore()
  const { user_type } = toJS(UserStore.UserDetails)
  const BlogTypeDrop = getBlogDrop(user_type)

  const { isEdit, isOpen, okBtnText = 'OK', onClose, data, title, onSuccess } = props;

  const [initialValue, setInitialValue] = useState({ ...initialFormValue });

  const DisableUserType = (['ADMIN', 'SUPERADMIN', 'NUTRITION'].includes(user_type)) ? false : true

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
        const { image, image_thumbnail, ...rest } = value;
        const PostData = rest;
        const [ImgRes, ImgTumpRes] = await Promise.all([uploadNewImage(image), uploadNewImage(image_thumbnail)])

        PostData.image = ImgRes
        PostData.image_thumbnail = ImgTumpRes

        !isEdit && addData(PostData, helper);
        isEdit && editData(PostData, helper);
      };
      render();
    } catch (err) {
      helper.setSubmitting(false);
      Snackbar.show('Image Upload Failed', 'error');
    }
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addBlog', data)
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
    Post('app/editBlog', data)
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
      initialFormValue.blog_type = DisableUserType ? user_type : ''
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
          description: Yup.string().trim().required('Blog Description is required'),
          blog_type: Yup.string().trim().required('Blog Type is required'),
          title: Yup.string().trim().required('Blog Title is required'),
          image: Yup.object({ file: Yup.mixed().required('A file is required') }),
          image_thumbnail: Yup.object({ file: Yup.mixed().required('A file is required') }),
        })}
      >
        {({ values, errors, touched, handleBlur, handleChange, setFieldValue, submitForm, setFieldTouched, isSubmitting, }) => (
          <>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Title'
                    name='title'
                    variant='outlined'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    options={BlogTypeDrop}
                    value={BlogTypeDrop.find((data: any) => data.id == values.blog_type)}
                    getOptionLabel={(option: any) => option.name}
                    disabled={DisableUserType}
                    onChange={(event: any, newValue: any) => {
                      setFieldValue('blog_type', newValue?.id || '');
                    }}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Blog Type'
                        variant='outlined'
                        error={Boolean(touched.blog_type && errors.blog_type)}
                        helperText={touched.blog_type && errors.blog_type}
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
                    error={Boolean(
                      touched?.description &&
                      errors?.description
                    )}
                  >
                    <TipTapEditor
                      value={values.description}
                      onChange={(value: any) => setFieldValue('description', value)}
                      onBlur={() => setFieldTouched('description', true, true)}
                    />

                    <FormHelperText>
                      {touched?.description &&
                        errors?.description}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
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

                <Grid item md={6} xs={12}>
                  <input
                    name='image_thumbnail'
                    ref={imageThumbnailRef}
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
                    onClick={() => imageThumbnailRef.current.click()}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Thumbnail
                  </Button>
                  <FormControl
                    error={Boolean(touched?.image_thumbnail?.file && errors?.image_thumbnail?.file)}
                  >
                    <FormHelperText>
                      {touched?.image_thumbnail?.file && errors?.image_thumbnail?.file}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  {values.image?.prevImage && (
                    <img
                      className={classes.imageView}
                      src={values.image?.prevImage}
                    />
                  )}
                </Grid>

                <Grid item md={6} xs={12}>
                  {values.image_thumbnail?.prevImage && (
                    <img
                      className={classes.imageView}
                      src={values.image_thumbnail?.prevImage}
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
})

export const ViewModel = (props: any) => {
  const { isOpen, title, onClose, data, onReload } = props;
  const classes = useStyle();
  const [formValue, setFormValue] = useState(data);

  const { Post } = useService();
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const [stateData, setStateData] = useState({ id: data?._id, page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const listBlogComments = async () => {
    setLoading(true);
    Post('app/listBlogComments', stateData)
      .then((res: any) => {
        console.log('listBlogComments', res);
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

  const onApprove = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/approveComment', { comment_id: data._id, blog_id: stateData.id })
        .then(async (res: any) => {
          setLoading(false);
          closeModel();
          listBlogComments()
          onReload();
          Snackbar.show(res.message, 'success');
        })
        .catch((err: any) => {
          setLoading(false);
          Snackbar.show('Internal Server Error', 'error');
        });
    };
    openModel(submitFunction, "Are you sure want to Approve", "Approve");
  };

  const onReject = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/rejectComment', { comment_id: data._id, blog_id: stateData.id })
        .then(async (res: any) => {
          setLoading(false);
          closeModel();
          listBlogComments()
          onReload();
          Snackbar.show(res.message, 'success');
        })
        .catch((err: any) => {
          setLoading(false);
          Snackbar.show('Internal Server Error', 'error');
        });
    };
    openModel(submitFunction, "Are you sure want to Reject", "Reject");
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
  };

  useEffect(() => {
    setFormValue(data);
    setStateData((prevState) => ({ ...prevState, id: data._id }))
  }, [props.data]);

  useEffect(() => {
    listBlogComments();
  }, [stateData]);

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
        <div style={{ marginTop: '20px' }}>
          <label className={classes.blogTypeStyle}>{formValue?.blog_type}</label>
        </div>
        <List>
          <ListItem>
            <ListItemText
              primary={<Typography variant='h5'><strong>{formValue?.title}</strong></Typography>}
              secondary={<Typography variant='subtitle2'>by <span className={classes.greenColor}>{formValue?.created_name}</span> . {moment(formValue?.created_at).format('MMM DD, YYYY')}</Typography>}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={<div className={classes.htmlContent} dangerouslySetInnerHTML={{ __html: formValue?.description }} />}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <img src={LikeImage} className={classes.likeCountImg} alt='like' />
            </ListItemIcon>
            <ListItemText primary={`${formValue?.like_count} Likes`} />
            <ListItemIcon>
              <img src={CommentImage} className={classes.likeCountImg} alt='Comment' />
            </ListItemIcon>
            <ListItemText primary={`${formValue?.comment_count} Comments`} />
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemText
              primary={<Typography className={classes.ingrdientsGridMain} variant='h5'><strong>Comments</strong></Typography>}
            />
          </ListItem>
          {!loading &&
            dataList.map((data: any, index: number) => <CommentItem key={index} data={data} onApprove={onApprove} onReject={onReject} />)}

          {loading && <ListItem><ListItemText classes={{ primary: classes.noCommentsText }} primary={<CircularProgress className={classes.greenColor} />} /></ListItem>}
          {!loading && dataList.length == 0 && (
            <ListItem><ListItemText classes={{ primary: classes.noCommentsText }} primary='No Comments' /> </ListItem>
          )}
          <ListItem className={classes.justifyCenter}>
            <Pagination
              count={pageCount}
              page={stateData.page_no}
              onChange={onPageChange}
            />
          </ListItem>
        </List>


      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>

    </Dialog >
  )
}

const CommentItem = (props: any) => {
  const classes = useStyle()
  const { data, onApprove, onReject } = props
  const [commentData, setCommentData] = useState(data)
  const [expand, setExpand] = useState(false)

  const pushReplyData = (replyData: any) => {
    let reply = commentData.reply
    reply.push(replyData)
    setCommentData((prevState: any) => ({ ...prevState, reply }))
  }
  useEffect(() => {
    setCommentData(props.data)
  }, [props.data])
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={commentData?.comment_by_image} />
        </ListItemAvatar>

        <ListItemText
          primary={<Typography variant='subtitle2'>{`${commentData?.comment_by_name} . ${moment(commentData?.created_at).format('MMM DD, YYYY')}`}</Typography>}
          secondary={
            <>
              <Typography variant='subtitle2'>{commentData?.comment}</Typography>
              <Grid container direction="row" justify="flex-start" alignItems="center" >

                {commentData?.status == 1 && <IconButton
                  color="inherit"
                  aria-label="like"
                  className={classes.replyButtons}
                  onClick={() => setExpand((prevState: Boolean) => !prevState)}
                >
                  {commentData?.reply_count ? `${commentData?.reply_count} Replies` : 'Reply'}
                </IconButton>
                }
              </Grid>
            </>
          }
        />

        {commentData?.status == 0 &&
          <>
            <IconButton className={classes.themeButton} onClick={() => onApprove(commentData)}>
              <CheckIcon />
            </IconButton>
            <IconButton className={classes.rejectButtonStyle} onClick={() => onReject(commentData)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      </ListItem>

      <Accordion elevation={0} classes={{ root: classes.accordionRoot, expanded: classes.accordionExpanded }} expanded={expand}>
        <AccordionSummary className={classes.accordionSummaryRoot} />
        <AccordionDetails className={classes.accordionDetailsRoot} >
          {commentData?.reply?.map((replayData: any, index: any) => <ReplyItem key={index} data={replayData} />)}
          <ReplyComments commentsData={commentData} onSuccess={pushReplyData} />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

const ReplyItem = (props: any) => {
  const { data } = props
  const [replayData, setReplyData] = useState(data)
  useEffect(() => {
    setReplyData(props.data)
  }, [props.data])
  return (
    <ListItem >
      <ListItemAvatar>
        <Avatar src={replayData?.reply_by_image?.url} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='subtitle2'>{`${replayData?.reply_by_name} . ${moment(replayData?.created_at).format('MMM DD, YYYY')}`}</Typography>}
        secondary={<Typography variant='subtitle2'>{replayData?.reply}</Typography>}
      />
    </ListItem>
  )
}

const ReplyComments = (props: any) => {
  const { commentsData, onSuccess } = props;
  const { blog_id, _id: id } = commentsData;
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const [reply, setReply] = React.useState('');


  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReply(event.target.value);
  }

  const sendReplyMessage = () => {
    if (reply.trim() == '') {
      Snackbar.show('Replay is Required', 'error');
      return
    }

    const sentReplyData = {
      blog_id,
      comment_id: id,
      reply: reply
    }
    Post('app/addCommentReply', sentReplyData)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setReply('')
        onSuccess(res.data)
      })
      .catch((err: any) => {
        Snackbar.show(err.message, 'error');
        console.log(err)
      })
  }

  return (
    <ListItem>
      <TextField multiline fullWidth placeholder='Reply...' size='small' variant='outlined' value={reply} onChange={handleReplyChange} />
      <IconButton color='primary' onClick={sendReplyMessage}>
        <SendIcon />
      </IconButton>
    </ListItem>
  )
}

export default Blogs



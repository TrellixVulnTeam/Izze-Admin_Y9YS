import React from 'react'
import { Grid, Button, Paper, makeStyles, Avatar, Table, TableBody, TableCell, TableRow, IconButton, Dialog, DialogActions, DialogContent, TextField, List, ListItem, ListItemAvatar, ListItemText, Typography,} from '@material-ui/core'
import Page from '../../components/Page/Page';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { uploadNewImage } from '../../utils/CloudinaryUtils';

const useStyle = makeStyles((theme: any) => ({
  root: {
    width: theme.breakpoints.values.lg,
    height : '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  paperStyle : {
      width : '100%',
      height : '85vh',
  },
  insidePaperDivStyle : {
     display : 'flex',
     flexDirection : 'column',
     justifyContent : 'center',
     margin : 'auto',
     alignItems : 'center',
     height : '100%'
  },
  themeButton: {
    color: theme.palette.white,
    textTransform : 'capitalize',
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
  },
  avatarStyle : {
      width : '150px',
      height : '150px'
  },
  lColor: {
    color: theme.palette.green.main,
  }

}));

const AdminProfileDetails = () => {
  const classes = useStyle();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const [profileData, setProfileData] = React.useState<any>('');
  const [isLoading, setIsLoading] = React.useState(false)


  const getProfileDetails = () =>{
        setIsLoading(true);
        Post('app/getAdminUser', {})
        .then((res: any) => {
            setIsLoading(false);
            if (!res.error) {
            setProfileData(res.data);
            } else {
            Snackbar.show(res.message, 'error');
            }
        })
        .catch((err: any) => {
            console.log('err', err);
            setIsLoading(false);
            Snackbar.show(err.message, 'error');
        });
    }

    React.useEffect(()=>{
        getProfileDetails()
    },[])

  return (
    <div className={classes.root}>
      <Page title='Admin Profile' />
        <Grid container spacing={2}>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
                <Paper className={classes.paperStyle}>
                    {!isLoading && (
                        <div className={classes.insidePaperDivStyle}>
                        <Avatar className={classes.avatarStyle} src={profileData?.image?.url} alt={profileData?.name} variant='square' />
                        <Table style={{width : '65%'}}>
                            <TableBody>
                            <TableRow >
                                <TableCell align = 'left'>Name</TableCell>
                                <TableCell align = 'center'>{profileData?.name}</TableCell>
                                <TableCell align = 'right'><EditProfile data={profileData} getDatafunction={getProfileDetails}/></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align = 'left'>Email</TableCell>
                                <TableCell align = 'center'>{profileData?.email}</TableCell>
                                <TableCell align = 'right'></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align = 'left'>Admin Type</TableCell>
                                <TableCell align = 'center'>{profileData?.user_type}</TableCell>
                                <TableCell align = 'right'></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align = 'left'>Password</TableCell>
                                <TableCell align = 'center'>**********</TableCell>
                                <TableCell align = 'right'><ChangePassword getDatafunction={getProfileDetails}/></TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    )}

                    {isLoading && <div className={classes.insidePaperDivStyle}><CircularProgress className={classes.lColor} /></div>}
                    
                </Paper>
            </Grid>
            <Grid item xs={12} md={2}></Grid>
        </Grid>

    </div>
  )
}

const initialEditValues = {
    name : '',
    image : {file : null, prevImage : '',isNew : null},
}

export const EditProfile = (props: any) =>{
    const { data, getDatafunction } = props;
    const classes = useStyle();
    const formikRef = React.useRef<any>(null);
    const imageRef = React.useRef<any>(null);
    const { Post } = useService();
    const Snackbar = useSnackbar();
    const [isEdit, setIsEdit] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false);
    const [initialFormValues, setInitialFormValues] = React.useState({...initialEditValues});

    React.useEffect(()=>{
        if(isEdit){
            const {image, _id, ...rest} = data;
            const editData = {...rest, id: _id}
            editData.image = {
                file: image,
                prevImage: image?.url,
                isNew: false,
            }
            console.log(editData)
            setInitialFormValues(editData)
        }
        else{
            setInitialFormValues(initialEditValues)
        }
    },[props, isEdit])

    const editProfileModel = () =>{
        setIsOpen(!isOpen);
        setIsEdit(true)
    }

    const onClose = () =>{
        setIsOpen(!isOpen);
        getDatafunction();
    }

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
              isNew : true
            });
          };
          reader.readAsDataURL(file);
        } else {
          formikRef.current.setFieldValue('image', {
            file: null,
            prevImage: '',
            isNew : null
          });
        }
    };

    const onSubmit = async (value: any, helper: any) =>{
        const { name , image} = value;
        const postData: any = {};
        postData.name = name;
        postData.image = await uploadNewImage(image);
        editProfile(postData,helper)
    }

    const editProfile = (data: any, { setSubmitting, resetForm }: any) =>{
        Post('app/updateAdminDetails', data)
        .then((res: any) => {
            Snackbar.show(res.message, 'success');
            setSubmitting(false);
            resetForm();
            onClose();
        })
        .catch((err: any) => {
            Snackbar.show(err.message, 'error');
        });
    }


    return (
        <>
            <IconButton onClick={editProfileModel} className={classes.themeButton}><EditIcon /></IconButton>
            <Dialog open={isOpen} disableBackdropClick disableEscapeKeyDown fullWidth maxWidth='sm' aria-labelledby='dialog-title'>
                <DialogTitle id='dialog-title' onClose={onClose}>
                    Edit Profile
                </DialogTitle>

                <Formik
                    innerRef={formikRef}
                    enableReinitialize
                    initialValues={initialFormValues}
                    validationSchema={Yup.object().shape({
                        name : Yup.string().required('Name is required'),
                        image : Yup.object({file: Yup.mixed().required('A file is required')})
                    })}
                    onSubmit={onSubmit}
                >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm, isSubmitting }) => (
                    <>
                        <DialogContent dividers>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <input
                                        name='recipe_image'
                                        ref={imageRef}
                                        type='file'
                                        accept='.jpg,.png,jpeg'
                                        onChange={onImageChange}
                                        onBlur={handleBlur}
                                        hidden
                                    />
                                    <div style={{display : 'flex', justifyContent : 'center'}}>
                                        <Avatar onClick={()=>imageRef.current.click()} className={classes.avatarStyle} src={values?.image?.prevImage} alt={'profilePic'} variant='square' />
                                    </div>   
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        fullWidth 
                                        label = 'Name'
                                        variant='outlined' 
                                        name = 'name'
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />   
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
                                'Save'
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

const initialValues = {
    password : '',
    confirmPassword : '',
}
export const ChangePassword = (props: any) =>{
    const { getDatafunction } = props;
    const classes = useStyle();
    const formikRef = React.useRef<any>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const { Post } = useService();
    const Snackbar = useSnackbar();
    const [initialFormValues, setInitialFormValues] = React.useState({...initialValues})

    const changePasswordModel = () =>{
        setIsOpen(!isOpen)
    }

    const onClose = () =>{
        setIsOpen(!isOpen);
        getDatafunction()
    }

    const onSubmit = (value: any, helper: any) =>{
        const { confirmPassword } = value
        let postData = {
            password : confirmPassword
        }
        changePasswordData(postData, helper)
    }

    const changePasswordData = (data: any, { setSubmitting, resetForm }: any) =>{
        Post('app/updateAdminPassword', data)
        .then((res: any) => {
            Snackbar.show(res.message, 'success');
            setSubmitting(false);
            resetForm();
            onClose();
        })
        .catch((err: any) => {
            Snackbar.show(err.message, 'error');
        });
    }

    return(
        <>
            <Button onClick={changePasswordModel} className={classes.themeButton}>Change</Button>
            <Dialog
                open={isOpen}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth
                maxWidth='sm'
                aria-labelledby='dialog-title'
            >
                <DialogTitle id='dialog-title' onClose={onClose}>
                    Change Password
                </DialogTitle>
                <Formik
                    innerRef={formikRef}
                    enableReinitialize
                    initialValues={initialFormValues}
                    validationSchema={Yup.object().shape({
                        password : Yup.string().required('Password is required'),
                        confirmPassword : Yup.string().oneOf([Yup.ref('password'),null], 'Password must be same').required('Confirm password is required')
                    })}
                    onSubmit={onSubmit}
                >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm, isSubmitting }) => (
                    <>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label = 'Password'
                                    variant='outlined' 
                                    name = 'password'
                                    type = 'password'
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />    
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    label = 'Confirm Password'
                                    variant='outlined'
                                    name = 'confirmPassword'
                                    type = 'password'
                                    value={values.confirmPassword}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                />   
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
                            'ChangePassword'
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

export default AdminProfileDetails;

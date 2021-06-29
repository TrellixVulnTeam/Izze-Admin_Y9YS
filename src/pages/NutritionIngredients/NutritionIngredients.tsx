import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, Grid, IconButton, makeStyles, Paper, Tab, Table, TableBody, FormControl, FormHelperText, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import { imageUpload } from '../../utils/FirebaseUtils';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import Page from '../../components/Page/Page';
import useConfModel from '../../hook/useConfModel';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



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
    deleteButton: {
      width: '100%',
      height: '50px',
    },
    imageView : {
      width : '100%',
      height : '100%',
    }
  }));

function NutritionIngredients() {
  const classes = useStyles()
  const [loading,setLoading] = React.useState(true)
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const { Post } = useService();
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [ingredientList, setIngredientList] = React.useState([])
  const [addEditDialog, setAddEditDialog] = React.useState({
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

  const listNutritionIngredient = async () => {
    setLoading(true);
    Post('app/listMealIngredient', stateData)
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setIngredientList(res.data);
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

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Nutrition Ingredients',
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
      title: 'Edit Nutrition Ingredients',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Nutrition Ingredient',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteMealIngredient', { id: data._id })
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

  const closeViewDialog = () => {
    setViewDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const closeAddEditDialog = () =>{
    setAddEditDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  }

  const setElipsis = (text: any) => {
    return text?.length >= 25 ? `${text.substring(0, 40)}...` : text;
  };

  const onSuccessAction = () => {
    listNutritionIngredient();
    closeAddEditDialog();
  };

  useEffect(() => {
    listNutritionIngredient();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Nutrition Ingredients' />

      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Nutrition Ingredients
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
                  <TableCell align='center'>Image</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Description</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  ingredientList.map((data: any, index: number) => (
                    <TableRow hover key={index}>
                      <TableCell align='center'>
                        {stateData.page_limit * (stateData.page_no - 1) + index + 1}
                      </TableCell>
                      <TableCell align='center'>
                        <div className={classes.jCenter}>
                          <Avatar variant='square' src={data?.image} />
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
                {!loading && ingredientList.length == 0 && (
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

      <AddandEditDialogue {...addEditDialog}  onClose={closeAddEditDialog} onSuccess={onSuccessAction}/>
      {viewDialog.isOpen && <ViewIngredientModel {...viewDialog} onClose={closeViewDialog} />}
    </div>
  );
}



interface NutritionValues {
  nutrientName : string,
  image : {file : null | any ,prevImage : string , isNew : null | boolean},
  quantity : string,
  protein : string,
  fat : string,
  carbs : string,
  calories : string,
  benfits : Array<any>,
  description : string
}

const AddandEditDialogue = (props: any) =>{
    const { isEdit, isOpen, okBtnText = 'OK', onClose,data, title, onSuccess} = props;
    const classes = useStyles()
    const formikRef = useRef<any>(null)
    const imageRef = useRef<any>(null)
    const Snackbar = useSnackbar();
    const { Post } = useService();
    const initialValues: NutritionValues = {
        nutrientName : '',
        image : {file : null,prevImage : '' , isNew : null},
        quantity : '',
        protein : '',
        fat : '',
        carbs : '',
        calories : '',
        benfits : [],
        description : '',
    };
    
    const [initialFormValues,setInitialFormValues] = React.useState({...initialValues});
    const [addBenifits,setAddBenifits] = React.useState<any>([])

    const handleAddBenifits = (event: any) =>{
      event.preventDefault()
      const dummyData = [...addBenifits,''];
      setAddBenifits(dummyData)
      formikRef.current.setFieldValue('benfits',dummyData)
    }

    const removeBenifits = (item: any) =>{
      const deleteBenifitsData = [...addBenifits];
      deleteBenifitsData.splice(deleteBenifitsData.indexOf(item), 1);
      formikRef.current.setFieldValue('benfits',deleteBenifitsData)
      setAddBenifits(deleteBenifitsData)
    }

    const handleBenifitChange = (event:any,index:any) =>{
      addBenifits[index] = event.target.value;
      formikRef.current.setFieldValue('benfits',[...addBenifits])
    }

    const onSubmit = (value: any,helper: any) =>{
      try{
        helper.setSubmitting(true)
        const renderSubmit = async () =>{
          const { image, nutrientName, ...rest} = value;
          const { isNew, file} = image;
          const postData = rest;
          postData.name = nutrientName
          if (isNew) {
            postData.image = await imageUpload(file);
          } else {
            postData.image = file;
          }
          !isEdit && addData(postData, helper);
          isEdit && editData(postData, helper);
        }
        renderSubmit()
      }
      catch{
        Snackbar.show('Image Upload Failed', 'error');
      }
    }

    const addData = (data: any, { setSubmitting, resetForm }: any) => {
      setSubmitting(true);
      Post('app/addMealIngredient', data)
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
      Post('app/editMealIngredient', data)
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

    useEffect(()=>{
      if(isEdit){
        const { name, image, _id, ...rest} = data;
        const editData = {...rest, id:_id}
        editData.nutrientName = name;
        editData.image = {file : image, isNew : false, prevImage : image}
        setAddBenifits(data.benfits)
        setInitialFormValues(editData);
      } else {
        setInitialFormValues(initialValues);
      }
    },[props])

    return (
    <div>
       <Dialog 
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth='md'
        aria-labelledby='dialog-title' >

        <DialogTitle id='dialog-title' onClose={onClose}>
          {title}
        </DialogTitle>
        <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
            nutrientName: Yup.string().trim().required('Name is required'),
            quantity : Yup.string().trim().required('Quality is required'),
            protein : Yup.string().trim().required('Protein is required'),
            fat : Yup.string().trim().required('Fat is required'),
            carbs : Yup.string().trim().required('Carbs is required'),
            calories : Yup.string().trim().required('Calories is required'),
            description : Yup.string().trim().max(250, 'Must be 250 characters or less').required('Description is required'),
            image: Yup.object({
              file: Yup.mixed().required('A file is required'),
            }),
            benfits : Yup.array().of(Yup.string().required('Benefits is required'))
        })}
        >
            {({values, errors, touched, handleBlur,handleChange, submitForm, isSubmitting,}: any)=>(
                <>
                {console.log(errors)}
                <DialogContent dividers>
                    <Grid container spacing = {2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Name'
                                name='nutrientName'
                                variant='outlined'
                                error={Boolean(touched.nutrientName && errors.nutrientName)}
                                helperText={touched.nutrientName && errors.nutrientName}
                                value={values.nutrientName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Quantity'
                                name='quantity'
                                variant='outlined'
                                error={Boolean(touched.quantity && errors.quantity)}
                                helperText={touched.quantity && errors.quantity}
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label='Protein'
                                name='protein'
                                variant='outlined'
                                error={Boolean(touched.protein && errors.protein)}
                                helperText={touched.protein && errors.protein}
                                value={values.protein}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label='Fat'
                                name='fat'
                                variant='outlined'
                                error={Boolean(touched.fat && errors.fat)}
                                helperText={touched.fat && errors.fat}
                                value={values.fat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label='Carbs'
                                name='carbs'
                                variant='outlined'
                                error={Boolean(touched.carbs && errors.carbs)}
                                helperText={touched.carbs && errors.carbs}
                                value={values.carbs}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label='Calories'
                                name='calories'
                                variant='outlined'
                                error={Boolean(touched.calories && errors.calories)}
                                helperText={touched.calories && errors.calories}
                                value={values.calories}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={12}>
                             <Button
                             fullWidth
                              className={classes.themeButton}
                              variant='contained'
                              color='default'
                              onClick={(e)=>handleAddBenifits(e)}
                              endIcon={<ControlPointIcon />}
                            >
                              Add Benefits
                            </Button>
                        </Grid>

                        {values?.benfits?.map((data: any,index: any)=>{
                          return (
                            <>
                              <Grid item xs={11}>
                                <TextField
                                    fullWidth
                                    label='Benefits'
                                    name={`benfits[${index}]`}
                                    variant='outlined'
                                    error={Boolean(
                                      touched?.benfits &&
                                      touched?.benfits[index] &&
                                      errors?.benfits &&
                                      (errors?.benfits[index] as any)
                                    )}
                                    helperText={
                                      touched?.benfits &&
                                      touched?.benfits[index] &&
                                      errors?.benfits &&
                                      (errors?.benfits[index] as any)
                                    }
                                    value={data}
                                    onChange={(e)=>handleBenifitChange(e,index)}
                                    onBlur={handleBlur}
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  fullWidth
                                  className={classes.deleteButton}
                                  variant='contained'
                                  color='secondary'
                                  onClick={() =>
                                    removeBenifits(data)
                                  }
                                >
                                  <DeleteIcon />
                                </Button>
                              </Grid>
                            </>
                          )
                        })}

                        <Grid item xs={12}>
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
                        <CircularProgress size={24} style={{color : 'white'}} />
                      ) : (
                        okBtnText
                      )}
                    </Button>
                  </DialogActions>
                </>
            )}
        </Formik>

       </Dialog>
    </div>
    )
}

const ViewIngredientModel = (props: any) =>{
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);
  console.log(formValue)

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
                <TableCell>Name</TableCell>
                <TableCell><strong>{formValue?.name}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Calories</TableCell>
                <TableCell><strong>{formValue?.calories}</strong></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Carbs</TableCell>
                <TableCell><strong>{formValue?.carbs}</strong></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Fat</TableCell>
                <TableCell><strong>{formValue?.fat}</strong></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Protein</TableCell>
                <TableCell><strong>{formValue?.protein}</strong></TableCell>
              </TableRow>
              <TableRow >
                <TableCell>Quantity</TableCell>
                <TableCell><strong>{formValue?.quantity}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Paper style={{marginTop : '20px'}} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'><strong>#</strong></TableCell>
                <TableCell align='center'><strong>Benifits</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formValue?.benfits?.map((item: any,index: any)=>{
                return (
                  <TableRow>
                    <TableCell align='center'>{index + 1}</TableCell>
                    <TableCell align='center'>{item}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>

        <Typography style={{marginTop : '20px'}} variant = 'h4'>Description</Typography>
        <Typography style={{marginTop : '10px'}} variant = 'h5'>{formValue?.description}</Typography>

        <Grid style={{marginTop : '20px'}} container>
          <Grid item md={12} xs={12}>
            {formValue?.image && (
              <img className={classes.imageView} src={formValue?.image} />
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
  )
}

export default NutritionIngredients;

import React, { useEffect, useRef, useState } from 'react';
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
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Tab,
  Table,
  TableBody,
  FormControl,
  FormHelperText,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Divider,
  Typography,
  Tabs,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination, TabContext, TabList, TabPanel } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { initialValues, validation } from './FormikValues';
import AddEditModelTextFields from './AddEditTextField';

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
    minWidth: 72,
    margin: '10px 0px',
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
    // display : 'flex',
    marginTop: '20px',
  },
  paperRoot1: {
    display: 'flex',
    marginTop: '20px',
  },
  tablePanelRoot: {
    padding: '0px',
  },
  largeAvatar : {
    width : theme.spacing(10),
    height : theme.spacing(10)
  },
  justPadding : {
    padding : 10,
    borderRadius : 10
  }
}));

function NutritionPlan() {
  const classes = useStyles();
  const Snackbar = useSnackbar();
  const { Post } = useService();
  const [loading, setLoading] = React.useState(true);
  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [nutritionPlanList, setNutritionPlanList] = React.useState([]);
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

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Nutrition Ingredient',
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

  React.useEffect(() => {
    listNutritionPlan();
  }, []);

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
                  <TableCell align='center'>Goal Plan</TableCell>
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
                      <TableCell align='center'>{data?.goal_plan}</TableCell>
                      <TableCell align='center'>{data?.diet_type}</TableCell>
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
                              // onClick={() => onDelete(data)}
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
  const [initialFormValues, setInitialFormValues] = React.useState({
    ...initialValues,
  });

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
    alert('done');
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

  useEffect(() => {
    if (isEdit) {
      const editData = data;
      setInitialFormValues(editData);
    } else {
      setInitialFormValues(initialFormValues);
    }
  }, [props]);

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
          initialValues={initialFormValues}
          validationSchema={validation.validationSchema}
          onSubmit={onSubmit}
        >
          {(props: any) => (
            <>
              <DialogContent dividers>
                <AddEditModelTextFields
                  {...props}
                  formikRef={formikRef}
                  data={data}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={onClose} variant='outlined' color='secondary'>
                  Cancel
                </Button>
                <Button
                  className={classes.themeButton}
                  onClick={() => props.submitForm()}
                  disabled={props.isSubmitting}
                  variant='outlined'
                >
                  {props.isSubmitting ? (
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
  const [value, setValue] = React.useState<any>('Fats');
  const [timings, setTimings] = React.useState('Early-Morning');
  console.log(formValue);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const handleTimingChange = (
    event: React.ChangeEvent<{}>,
    newValue: string
  ) => {
    setTimings(newValue);
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
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Goal plan</TableCell>
                <TableCell>
                  <strong>{formValue?.goal_plan}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Diet type</TableCell>
                <TableCell>
                  <strong>{formValue?.diet_type}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Activity factor</TableCell>
                <TableCell>
                  <strong>{formValue?.actvity_factor}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Calories</TableCell>
                <TableCell>
                  <strong>{formValue?.calories}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Paper className={classes.paperRoot}>
          <TabContext value={value || ''}>
            <TabList
              classes={{
                indicator: classes.tabIndicator,
              }}
              onChange={handleChange}
              variant='standard'
              centered
            >
              {['Carbs', 'Fats', 'Protein'].map((item: any) => (
                <Tab
                  classes={{
                    root: classes.tabRoot,
                    textColorInherit: classes.tabTextColorInherit,
                  }}
                  label={item}
                  value={item.toString()}
                />
              ))}
            </TabList>

            <TabPanel
              className={classes.tabPanelRoot}
              classes={{ root: classes.tablePanelRoot }}
              value={value}
            >
              {value === 'Carbs' && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Calories</TableCell>
                      <TableCell>
                        <strong>{formValue?.carbs?.calories}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Grams</TableCell>
                      <TableCell>
                        <strong>{formValue?.carbs?.gram}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Macros</TableCell>
                      <TableCell>
                        <strong>{formValue?.carbs?.macros}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}

              {value === 'Fats' && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Calories</TableCell>
                      <TableCell>
                        <strong>{formValue?.fat?.calories}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Grams</TableCell>
                      <TableCell>
                        <strong>{formValue?.fat?.gram}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Macros</TableCell>
                      <TableCell>
                        <strong>{formValue?.fat?.macros}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}

              {value === 'Protein' && (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Calories</TableCell>
                      <TableCell>
                        <strong>{formValue?.protein?.calories}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Grams</TableCell>
                      <TableCell>
                        <strong>{formValue?.protein?.gram}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Macros</TableCell>
                      <TableCell>
                        <strong>{formValue?.protein?.macros}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </TabPanel>
          </TabContext>
        </Paper>

        <Paper className={classes.paperRoot}>
          <TabContext value={timings || ''}>
            <TabList
              classes={{
                indicator: classes.tabIndicator,
              }}
              onChange={handleTimingChange}
              variant='scrollable'
              centered
            >
              {[
                'Early-Morning',
                'Breakfast',
                'Mid-Moring Snacks',
                'Lunch',
                'Evening Snacks',
                'Dinner',
              ].map((item: any) => (
                <Tab
                  classes={{
                    root: classes.tabRoot,
                    textColorInherit: classes.tabTextColorInherit,
                  }}
                  label={item}
                  value={item}
                />
              ))}
            </TabList>

            <TabPanel
              className={classes.tabPanelRoot}
              style={{ marginTop: '20px' }}
              value={timings}
            >
              <Grid container spacing={2}>
                {timings === 'Early-Morning' &&
                  formValue?.early_morning?.ingredients?.map((values: any, index: any) => {
                    return (
                      <Grid key={index} item xs={12} md={6}>
                        <Card className={classes.justPadding}>
                          <div className={classes.flexDisplay}>
                            <Avatar variant = 'square' src={values?.image} className={classes.largeAvatar} />
                            <List className={classes.justPadding}>
                              <ListItemText primary={<Typography variant='h4'><strong>{values?.name}</strong></Typography>} />
                              <ListItemText secondary={values?.quantity}/>
                            </List>
                          </div>
                          <div className={classes.sBetween}>
                            <List className={classes.justPadding}>
                              <ListItemText 
                                primary={<Typography variant='h5'><strong>Protein</strong></Typography>} 
                                secondary={values.protein}
                              />
                            </List>
                            <List className={classes.justPadding}>
                              <ListItemText 
                                primary={<Typography variant='h5'><strong>Fat</strong></Typography>} 
                                secondary={values.fat}
                              />
                            </List>
                            <List className={classes.justPadding}>
                              <ListItemText 
                                primary={<Typography variant='h5'><strong>Carbs</strong></Typography>} 
                                secondary={values.carbs}
                              />
                            </List>
                          </div>
                          <Divider style={{marginBottom : 10}}/>
                          <Typography style={{marginBottom : 10}} variant='h5'><strong>Benifits:</strong></Typography>
                          <Grid container>
                            {values?.benfits?.map((data: any, index: any)=>{
                              return (
                                <Grid key={index} item xs={6}>
                                    <ul style={{paddingLeft:'20px'}}>
                                      <li>{data}</li>
                                    </ul>
                                </Grid>
                              )
                            })}                            
                          </Grid>
                        </Card>
                      </Grid>
                    );
                })}
                {timings === 'Breakfast' &&
                  formValue?.early_morning?.ingredients?.map((values: any, index: any) => {
                    return (
                      <Grid key={index} item xs={12} md={6}>
                        <Card >
                          <Avatar />
                        </Card>
                      </Grid>
                    );
                })}
                {timings === 'Mid-Moring Snacks' &&
                  formValue?.early_morning?.ingredients?.map(() => {
                    return (
                      <Grid item xs={12} md={6}>
                        <Card>
                          <h1>Mid-Moring Snacks</h1>
                        </Card>
                      </Grid>
                    );
                })}
                {timings === 'Lunch' &&
                  formValue?.early_morning?.ingredients?.map(() => {
                    return (
                      <Grid item xs={12} md={6}>
                        <Card>
                          <h1>Lunch</h1>
                        </Card>
                      </Grid>
                    );
                })}
                {timings === 'Evening Snacks' &&
                  formValue?.early_morning?.ingredients?.map(() => {
                    return (
                      <Grid item xs={12} md={6}>
                        <Card>
                          <h1>Evening</h1>
                        </Card>
                      </Grid>
                    );
                })}
                {timings === 'Dinner' &&
                  formValue?.early_morning?.ingredients?.map(() => {
                    return (
                      <Grid item xs={12} md={6}>
                        <Card>
                          <h1>Dinner</h1>
                        </Card>
                      </Grid>
                    );
                })}
              </Grid>
            </TabPanel>
          </TabContext>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NutritionPlan;

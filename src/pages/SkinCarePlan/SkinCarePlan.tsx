import React, { useEffect, useRef, useState } from 'react';
import {
  makeStyles,
  Avatar,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Select,
  Tab,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page/Page';
import DialogTitle from '../../components/DialogTitlle/DialogTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination, TabContext, TabList, TabPanel } from '@material-ui/lab';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import useSnackbar from '../../hook/useSnackbar';
import useService from '../../hook/useService';
import useConfModel from '../../hook/useConfModel';
import { SkinCareRecipeViewContent } from '../SkinCareRecipe/SkinCareRecipe';

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
  dayPaper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.green.main,
    color: 'white',
  },
  lColor: {
    color: 'white',
  },
  tabCard: {
    marginTop: theme.spacing(3),
  },
  content: {
    padding: 0,
  },
  mTop: {
    marginTop: theme.spacing(1.5),
  },
  jCenter: {
    display: 'flex',
    justifyContent: 'center',
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
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
  ingredientsAvatarStyle: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
    marginTop: '20px',
  },
  //
  tabRoot: {
    minWidth: 72,
  },
  tabIndicator: {
    backgroundColor: theme.palette.green.main,
  },
  tabTextColorInherit: {
    backgroundColor: theme.palette.green.main,
    color: 'white',
    border: '1px solid white'
  },
  tabPanelRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%'
  },
  listItemRoot: {
    backgroundColor: '#7ac0af2b',
    margin: '10px 0px'
  },
  noListItemRoot: {
    backgroundColor: '#f500571c',
    margin: '10px 0px'
  },
  paperRoot: {
    display: 'flex'
  },
}));

const SkinTypeDrop = [
  { id: 'DRY', name: 'Dry' },
  { id: 'OILY', name: 'Oily' },
  { id: 'MIXED', name: 'Mixed' },
];

const SkinIssueDrop = [
  { id: 'ACNE', name: 'Acne', },
  { id: 'DRYSKIN', name: 'Dry Skin' },
];

const SkinCarePlan = () => {
  const classes = useStyles();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const ConfModel = useConfModel();
  const [isLoading, setIsLoading] = React.useState(true);
  const [stateData, setStateData] = React.useState({
    page_no: 1,
    page_limit: 10,
  });
  const [pageCount, setPageCount] = React.useState(0);
  const [tableData, setTableData] = React.useState([]);
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

  const listSkinCarePlan = () => {
    setIsLoading(true);
    Post('app/listSkinCarePlan', stateData)
      .then((res: any) => {
        setIsLoading(false);
        if (!res.error) {
          setPageCount(res.page_count);
          setTableData(res.data);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        Snackbar.show(error.message, 'error');
      });
  };

  const openAddDialog = () => {
    setAddEditDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      title: 'Add Skin Care Plan',
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
      title: 'Edit Skin care Plan',
      okBtnText: 'Edit',
    }));
  };

  const openViewDialog = (data: any) => {
    setViewDialog((prevState: any) => ({
      ...prevState,
      isOpen: true,
      data,
      title: 'View Skincare Plan',
    }));
  };

  const onDelete = (data: any) => {
    const { openModel, setLoading, closeModel } = ConfModel;
    const submitFunction = () => {
      setLoading(true);
      Post('app/deleteSkinCarePlan', { id: data._id })
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

  const onSuccessAction = () => {
    listSkinCarePlan();
    closeAddEditDialog();
  };

  const closeAddEditDialog = () => {
    setAddEditDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const closeViewDialog = () => {
    setViewDialog((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
  };

  useEffect(() => {
    listSkinCarePlan();
  }, [stateData]);

  return (
    <div className={classes.root}>
      <Page title='Skin Care Plan' />

      {/* =======Header====== */}
      <Grid alignItems='flex-end' container justify='space-between' spacing={3}>
        <Grid item>
          <Typography component='h1' variant='h3'>
            Skin Care Plan
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
                  <TableCell align='center'>Skin Type</TableCell>
                  <TableCell align='center'>Skin Issues</TableCell>
                  {/* <TableCell align='center'>Recipes</TableCell> */}
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  tableData.map((data: any, index: any) => {
                    return (
                      <TableRow hover>
                        <TableCell align='center'>{stateData.page_limit * (stateData.page_no - 1) + index + 1}</TableCell>
                        <TableCell align='center'>{getDropValues(SkinTypeDrop, data?.skin_type)}</TableCell>
                        <TableCell align='center'>{getDropValues(SkinIssueDrop, data?.skin_issues)}</TableCell>
                        {/* <TableCell align='center'>
                          {data?.recipes[0].recipe.recipe_name}
                        </TableCell> */}
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
                    );
                  })}
                {isLoading && <TableLoader />}
                {!isLoading && tableData.length == 0 && (
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

      {/* ==========Add & Edit Dialoge======== */}

      <AddEditDialog
        {...addEditDialog}
        onClose={closeAddEditDialog}
        onSuccess={onSuccessAction}
      />
      {viewDialog.isOpen && <ViewSkincarePlan {...viewDialog} onClose={closeViewDialog} />}
    </div>
  );
}

interface Recipe {
  id: string;
  day: number;
}

interface RecipePlan {
  skin_type: string;
  skin_issues: string;
  recipes: Recipe[];
}

const AddEditDialog = (props: any) => {
  const {
    isEdit,
    isOpen,
    okBtnText = 'OK',
    onClose,
    data,
    title,
    onSuccess,
  } = props;
  const classes = useStyles();
  const { Post } = useService();
  const Snackbar = useSnackbar();
  const formikRef = useRef<any>(null);
  const [skinCareRecipeList, setSkinCareRecipeList] = React.useState<any>([]);
  const initialFormValues: RecipePlan = {
    skin_type: '',
    skin_issues: '',
    recipes: Array(10).fill(null).map((d, i) => ({ day: i + 1, id: '' })),
  };
  const [initialValue, setInitialValue] = React.useState({
    ...initialFormValues,
  });

  const listSkinCareRecipeList = () => {
    Post('app/listAllSkinCareRecipe', {})
      .then((response: any) => {
        if (!response.error) {
          setSkinCareRecipeList(response.data);
        } else {
          Snackbar.show(response.message, 'error');
        }
      })
      .catch((error: any) => {
        Snackbar.show(error.message, 'error');
      });
  };

  const onSubmit = (value: any, helper: any) => {
    helper.setSubmitting(false);
    !isEdit && addData(value, helper);
    isEdit && editData(value, helper);
  };

  const addData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/addSkinCarePlan', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        const { message = "Internal Server Error" } = err.response.data
        setSubmitting(false);
        Snackbar.show(message, 'error');
      });
  };

  const editData = (data: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    Post('app/editSkinCarePlan', data)
      .then((res: any) => {
        Snackbar.show(res.message, 'success');
        setSubmitting(false);
        resetForm();
        onSuccess();
      })
      .catch((err: any) => {
        const { message = "Internal Server Error" } = err.response.data
        setSubmitting(false);
        Snackbar.show(message, 'error');
      });
  };

  useEffect(() => {
    if (isEdit) {
      const { recipes, _id, ...rest } = data;
      const editData = { ...rest, id: _id };
      editData.recipes = recipes.map((data: any) => {
        data.id = data.recipe._id;
        return data;
      });
      setInitialValue(editData);
    } else {
      setInitialValue(initialFormValues);
    }
  }, [props]);

  useEffect(() => {
    listSkinCareRecipeList();
  }, []);

  return (
    <div>
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
            skin_type: Yup.string().trim().required('Skin Type is required'),
            skin_issues: Yup.string().trim().required('Skin Issues is required'),
            recipes: Yup.array().of(
              Yup.object().shape({
                id: Yup.string().trim().required('Recipe is Required'),
                day: Yup.string().trim().required('Day is Required'),
              })
            ),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            submitForm,
            isSubmitting,
          }) => (
            <>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={SkinTypeDrop}
                      value={SkinTypeDrop.find((data: any) => data.id == values.skin_type)}
                      getOptionLabel={(option: any) => option.name}
                      getOptionSelected={(option) => option.id == values.skin_type}
                      onChange={(event: any, newValue: any) => {
                        setFieldValue('skin_type', newValue?.id || '');
                      }}
                      onBlur={handleBlur}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label='Skin Types'
                          variant='outlined'
                          error={Boolean(touched.skin_type && errors.skin_type)}
                          helperText={touched.skin_type && errors.skin_type}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={SkinIssueDrop}
                      value={SkinIssueDrop.find((data: any) => data.id == values.skin_issues)}
                      getOptionLabel={(option: any) => option.name}
                      getOptionSelected={(option) => option.id == values.skin_issues}
                      onChange={(event: any, newValue: any) => {
                        setFieldValue('skin_issues', newValue?.id || '');
                      }}
                      onBlur={handleBlur}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label='Skin Issues'
                          variant='outlined'
                          error={Boolean(touched.skin_issues && errors.skin_issues)}
                          helperText={touched.skin_issues && errors.skin_issues}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {values.recipes.map((recData: any, i: any) => {
                    return (
                      <>
                        <Grid md={1} item xs={2}>
                          <Paper
                            elevation={0}
                            component='div'
                            className={classes.dayPaper}
                          >
                            <Typography
                              color='inherit'
                              align={'center'}
                            >
                              {`Day - ${recData.day}`}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item md={11} xs={10}>
                          <Autocomplete
                            options={skinCareRecipeList}
                            value={skinCareRecipeList.find(
                              (data: any) => data._id == recData.id
                            )}
                            getOptionLabel={(option: any) => option.recipe_name}
                            getOptionSelected={(option) =>
                              option._id == recData.id
                            }
                            onChange={(event: any, newValue: any) => {
                              setFieldValue(`recipes[${i}].id`, newValue?._id || '');
                            }}
                            onBlur={handleBlur}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                label='Recipe'
                                variant='outlined'
                                error={Boolean(
                                  touched?.recipes &&
                                  touched?.recipes[i]?.id &&
                                  errors?.recipes &&
                                  (errors?.recipes[i] as any)?.id
                                )}
                                helperText={
                                  touched?.recipes &&
                                  touched?.recipes[i]?.id &&
                                  errors?.recipes &&
                                  (errors?.recipes[i] as any)?.id
                                }
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </>
                    );
                  })}
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
    </div>
  );
};

const ViewSkincarePlan = (props: any) => {
  const { isOpen, title, onClose, data } = props;
  const classes = useStyles();
  const [formValue, setFormValue] = useState(data);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const getDropValues = (dropValues: any, value: string) => {
    return dropValues.find(({ id }: any) => id == value)?.name || ''
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
        <Paper >
          <Table>
            <TableBody>
              <TableRow >
                <TableCell>Skin Type</TableCell>
                <TableCell><strong>{getDropValues(SkinTypeDrop, formValue?.skin_type)}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Skin Issues</TableCell>
                <TableCell><strong>{getDropValues(SkinIssueDrop, formValue?.skin_issues)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Paper className={classes.paperRoot}>
          <TabContext value={value || ''}>

            <TabList
              classes={{
                indicator: classes.tabIndicator
              }}
              onChange={handleChange}
              orientation="vertical"
              variant="standard"
            >
              {formValue?.recipes?.map((item: any) =>
                <Tab
                  classes={{ root: classes.tabRoot, textColorInherit: classes.tabTextColorInherit }}
                  label={`Day - ${item.day}`}
                  value={item.day.toString()} />
              )}
            </TabList>
    
            {formValue?.recipes?.map((item: any, index: any) =>
              <TabPanel key={index} className={classes.tabPanelRoot} value={item.day.toString()}>
                <SkinCareRecipeViewContent data={item.recipe} />
              </TabPanel>)}
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

export default SkinCarePlan;

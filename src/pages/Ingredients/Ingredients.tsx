import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CustomModel from '../../components/Model/Model';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page/Page';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CustomuploadButton from '../../components/Buttons/UploadButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomTable from '../../components/CustomTable/CustomTable';
import {
  AddIngredientsApi,
  ListIngredientsApi,
  DeleteIngredientsApi,
  EditIngredientsApi,
} from '../../Services/IngredientsAPI/Index';
import Skeleton from '@material-ui/lab/Skeleton';
import firebase from 'firebase';
import 'firebase/firestore';

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
  header: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  addcategoriesStyle: {
    backgroundColor: theme.palette.green.main,
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.green.main,
      color: 'white',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
  },
  additemsstyle: {
    fontSize: 20,
    fontWeight: 500,
  },
  ItemNamestyle: {
    width: '100%',
  },
  textfieldStyles: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  addButtonStyle: {
    backgroundColor: '#41A58D',
    color: 'white',
    width: '20%',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#41A58D',
      color: 'white',
    },
  },
  materialtextfieldstyle: {
    width: '45%',
  },
  viewmodelText: {
    textAlign: 'start',
    marginTop: 20,
    fontSize: 15,
    fontWeight: 500,
  },
  viewmodelTextName: {
    textAlign: 'start',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 500,
    color: theme.palette.green.main,
  },
  imgpreviewName: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  ImageStyle: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textareastyle: {
    borderRadius: 5,
    width: '100%',
    height: '100px !important',
    paddingLeft: 4,
    paddingTop: 10,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    outline: 'none',
  },

  uploadButtonStyle: {
    backgroundColor: 'white',
    color: theme.palette.green.main,
    border: `1px solid ${theme.palette.green.main}`,
  },
  SearchStyle: {
    width: '50%',
  },
  DeleteIcon: {
    position: 'absolute',
    marginLeft: '36%',
    marginTop: '-1%',
    opacity: 0.6,
    cursor: 'pointer',
  },
}));

function DashBoard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [contentLoading, setContentLoading] = React.useState(true);
  const [modelIsLoading, setModelIsLoading] = React.useState(false);
  const [viewAndEditModel, setViewAndEditModel] = React.useState(false);
  const [viewAndDeleteData, setViewAndDeleteData] = React.useState<any>('');
  const [modelTitle2, setModelTitle2] = React.useState('');
  const [modelTitle, setModelTitle] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [images, setImages] = React.useState<any>('');
  const [description, setDescription] = React.useState('');
  const [getFiles, setGetFiles] = React.useState<any>('');
  const [ingredientsData, setIngredientsData] = React.useState<any>('');
  const [ingredientsId, setIngredientsId] = React.useState('');
  const [pageValue, setPageValue] = React.useState(1);
  const [pageCount, setPageCount] = React.useState('');

  const openAddCategoriesModel = (type: any, values: any) => {
    setOpen(!open);
    setModelTitle(type);
    if (values !== 'Add') {
      setIngredientsId(values._id);
      setItemName(values.name);
      setDescription(values.description);
      setImages(values.image);
      setModelIsLoading(true);
      setTimeout(() => {
        setModelIsLoading(false);
      }, 3000);
    }
  };

  const imageUpload = async () => {
    return new Promise((resolve, reject) => {
      const storage = firebase.storage();
      storage
        .ref(`images/${getFiles.name}`)
        .put(getFiles)
        .then(async (imageResult) => {
          const download_url = await storage
            .ref(`images/${getFiles.name}`)
            .getDownloadURL();
          resolve(download_url);
          let addIngredients = {
            name: itemName,
            image: download_url,
            description: description,
          };
          const storeIngredientsData = await AddIngredientsApi(
            addIngredients,
            onSuccessAddedIngredient
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const onSuccessAddedIngredient = () => {
    setContentLoading(true);
    setOpen(!open);
    setIsLoading(false);
    setImages('');
    setDescription('');
    setItemName('');
    ingredientsList();
  };

  const addAndEditFuntion = (type: any) => {
    if (type === 'Add') {
      setIsLoading(true);
      imageUpload();
    } else {
      editIngredients();
    }
  };

  const editIngredients = async () => {
    let editIngredientsData = {
      id: ingredientsId,
      name: itemName,
      image: images,
      description: description,
    };
    let editDatas = await EditIngredientsApi(
      editIngredientsData,
      onSuccessEditedIntegration
    );
    return editDatas;
  };

  const onSuccessEditedIntegration = () => {
    setContentLoading(true);
    setOpen(!open);
    ingredientsList();
  };

  const viewAndDeleteModelOpen = (type: any, value: any) => {
    setViewAndEditModel(!viewAndEditModel);
    setModelTitle2(type);
    setViewAndDeleteData(value);
    setModelIsLoading(true);
    setTimeout(() => {
      setModelIsLoading(false);
    }, 3000);
  };

  const handleImageUpload = (event: any) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImages(reader.result);
    };
    reader.readAsDataURL(file);
    setGetFiles(file);
  };

  const handleModelClose = () => {
    setOpen(!open);
    setImages('');
    setDescription('');
    setGetFiles('');
  };

  const ingredientsList = async () => {
    let getList = {
      page_no: pageValue,
      page_limit: 10,
    };
    console.log(getList);
    ListIngredientsApi(getList, onSuccessIngredientList);
  };

  const onSuccessIngredientList = (response: any) => {
    setIngredientsData(response.data);
    setPageCount(response.page_count);
    setContentLoading(false);
  };

  React.useEffect(() => {
    ingredientsList();
  }, [pageValue]);

  const confirmDeleteIngredients = () => {
    let deleteId = {
      id: viewAndDeleteData._id,
    };
    DeleteIngredientsApi(deleteId, onSuccessDeletIngredients);
  };

  const onSuccessDeletIngredients = () => {
    setContentLoading(true);
    setViewAndEditModel(false);
    ingredientsList();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setContentLoading(true);
    setPageValue(value);
    ingredientsList();
  };

  return (
    <div className={classes.root}>
      <Page title='Projects List' />
      {contentLoading ? (
        <CircularProgress style={{ marginTop: '23%', marginLeft: '48%' }} />
      ) : (
        <div>
          <div className={classes.header}>
            <TextField
              id='outlined-basic'
              label='Search'
              variant='outlined'
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={classes.SearchStyle}
            />
            <Button
              variant='contained'
              onClick={() => openAddCategoriesModel('Add', 'Add')}
              className={classes.addcategoriesStyle}
            >
              <AddIcon className={classes.addIcon} />
              Add Items
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleModelClose}
            className={classes.modal}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography className={classes.additemsstyle}>
                  {modelTitle === 'Add' ? 'Add Items' : 'Edit Items'}
                </Typography>
                <CloseIcon
                  onClick={() => {
                    setOpen(!open);
                    setImages('');
                    setDescription('');
                    setItemName('');
                  }}
                  style={{ float: 'right', marginTop: -25, cursor: 'pointer' }}
                />
                {modelIsLoading === true && modelTitle === 'Edit' ? (
                  <div style={{ marginTop: 40 }}>
                    <Skeleton
                      animation='wave'
                      height={30}
                      width='80%'
                      style={{ marginTop: 40 }}
                    />
                    <Skeleton animation='wave' height={30} width='80%' />
                    <Skeleton
                      animation='wave'
                      height={400}
                      width='100%'
                      style={{ marginTop: -40 }}
                    />
                  </div>
                ) : (
                  <div>
                    <div style={{ paddingTop: 20 }}>
                      <TextField
                        id='outlined-basic'
                        label='Item Name'
                        variant='outlined'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className={classes.ItemNamestyle}
                      />
                    </div>
                    <div style={{ paddingTop: 20 }}>
                      <TextareaAutosize
                        className={classes.textareastyle}
                        rowsMin={3}
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <CustomuploadButton
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          paddingTop: 20,
                        }}
                        ButtonName={'Upload image'}
                        onChange={handleImageUpload}
                      />
                    </div>
                    {images === '' ? (
                      ''
                    ) : (
                      <div className={classes.imgpreviewName}>
                        <img
                          src={images}
                          alt={'Uploading Images'}
                          className={classes.ImageStyle}
                        />
                        {modelTitle ? (
                          <CancelIcon
                            onClick={() => setImages('')}
                            className={classes.DeleteIcon}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingTop: '20px',
                      }}
                    >
                      <Button
                        style={{ marginRight: 20, width: '20%' }}
                        className={classes.uploadButtonStyle}
                        onClick={() => {
                          setOpen(!open);
                          setImages('');
                          setDescription('');
                          setItemName('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={
                          modelTitle === 'Add'
                            ? () => addAndEditFuntion('Add')
                            : () => addAndEditFuntion('Edit')
                        }
                        className={classes.addButtonStyle}
                      >
                        {modelTitle === 'Add'
                          ? isLoading
                            ? 'Adding'
                            : 'Add'
                          : 'Edit'}
                        {isLoading ? (
                          <i
                            style={{ fontSize: 15, marginLeft: 20 }}
                            className='fas fa-spinner fa-pulse'
                          ></i>
                        ) : (
                          ''
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Fade>
          </Modal>
          <div>
            <CustomTable
              tableBodyData={ingredientsData}
              onEditFunction={(value: any) =>
                openAddCategoriesModel('Edit', value)
              }
              onViewFunction={(value: any) =>
                viewAndDeleteModelOpen('View', value)
              }
              onDeleteFunction={(value: any) =>
                viewAndDeleteModelOpen('Delete', value)
              }
              paginationOnChange={handlePageChange}
              page={pageValue}
              pageCount={pageCount}
            />
          </div>
          <CustomModel
            open={viewAndEditModel}
            onCancel={() => setViewAndEditModel(false)}
          >
            <div>
              <Typography className={classes.additemsstyle}>
                {modelTitle2 === 'View' ? 'View Item' : 'Delete Item'}
              </Typography>
              {modelTitle2 === 'View' ? (
                modelIsLoading ? (
                  <div style={{ marginTop: 40 }}>
                    <Skeleton
                      animation='wave'
                      height={30}
                      width='80%'
                      style={{ marginTop: 40 }}
                    />
                    <Skeleton animation='wave' height={30} width='80%' />
                    <Skeleton
                      animation='wave'
                      height={350}
                      width='100%'
                      style={{ marginTop: -30 }}
                    />
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.viewmodelTextName}>
                      {viewAndDeleteData.name}
                    </Typography>
                    <Typography className={classes.viewmodelText}>
                      {viewAndDeleteData.description}
                    </Typography>
                    <div className={classes.imgpreviewName}>
                      <img
                        src={viewAndDeleteData.image}
                        alt={'Uploading Images'}
                        className={classes.ImageStyle}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingTop: '20px',
                      }}
                    >
                      <Button
                        onClick={() => setViewAndEditModel(false)}
                        className={classes.addButtonStyle}
                      >
                        Ok
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <Typography style={{ fontSize: 18, paddingTop: 20 }}>
                    Are you sure want to delete this item ?
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingTop: '20px',
                    }}
                  >
                    <div>
                      <Button
                        style={{
                          backgroundColor: 'white',
                          color: '#41A58D',
                          border: '2px solid #41A58D',
                          textTransform: 'capitalize',
                          marginRight: 40,
                        }}
                        onClick={() => setViewAndEditModel(false)}
                      >
                        No
                      </Button>
                      <Button
                        style={{
                          backgroundColor: '#41A58D',
                          color: 'white',
                          border: '2px solid #41A58D',
                          textTransform: 'capitalize',
                        }}
                        onClick={confirmDeleteIngredients}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CustomModel>
        </div>
      )}
    </div>
  );
}

export default DashBoard;

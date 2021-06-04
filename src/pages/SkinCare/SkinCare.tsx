import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../components/Common/SearchBar/Searchbar';
import CustomModel from '../../components/Common/DialogBox/DialogBox';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Customtable from '../../components/CustomTable/CustomTable';
import Grid from '@material-ui/core/Grid';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CustomeUploadButton from '../../components/Buttons/UploadButton';
import Button from '@material-ui/core/Button';
import CustomDeleteModel from '../../components/Common/CustomDeleteModel/CustomeDeleteModel';
import { ListIngredientsApi } from '../../Services/IngredientsAPI/Index';
import {
  AddSkinCareApi,
  ListSkinCareApi,
} from '../../Services/SkincareApi/SkincareApi';
import firebase from 'firebase';
import 'firebase/firestore';

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  textFieldStyle: {
    width: '100%',
    marginBottom: theme.spacing(1),
    border: '1px solid #c5c3c3',
    borderRadius: 4,
  },
  textAreaStyle: {
    borderRadius: 5,
    width: '100%',
    height: '100px !important',
    paddingLeft: 4,
    paddingTop: 10,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    outline: 'none',
    border: '1px solid #c5c3c3',
    marginBottom: theme.spacing(1),
  },
  skinItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
  },
  skinItemstextfield: {
    // width: '95%',
    marginBottom: theme.spacing(1),
    border: '1px solid #c5c3c3',
    borderRadius: 4,
  },
  SelectdropDownStyle: {
    width: '98%',
    marginBottom: theme.spacing(1),
  },
  quantityStyle: {
    width: '70%',
    marginBottom: theme.spacing(1),
    border: '1px solid #c5c3c3',
    borderRadius: 4,
  },
  underline: {
    border: 'none',
  },
  addIngredientsStyle: {
    width: '100%',
    height: 55,
    cursor: 'pointer',
    border: '1px solid #c5c3c3',
    borderRadius: 4,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  removeIngredientsStyle: {
    float: 'right',
    marginTop: '-10%',
    marginRight: '-0.5%',
    backgroundColor: 'white',
    color: '#41a58d',
    borderRadius: '40px',
    fontSize: '25px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-25%',
    },
  },
  ImageplaceholderStyle: {
    width: '100%',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
  },
  uploadButtonStyle: {
    backgroundColor: 'white',
    color: theme.palette.green.main,
    border: `1px solid ${theme.palette.green.main}`,
    textTransform: 'capitalize',
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
}));

const tableHeader = [
  'S.No',
  'Recipe Name',
  'Recipe Image',
  'Recipe Description',
  'Actions',
];

function SkinCare() {
  const classes = useStyles();
  const [isPageLoading, setIsPageLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  // ......................TextField State.......................................//
  const [recipeName, setRecipeName] = React.useState('');
  const [recipeDiscription, setRecipeDescription] = React.useState('');
  const [skinType, setSkinType] = React.useState('');
  const [skinIssues, setSkinIssues] = React.useState('');
  const [preparationTime, setPreparationTime] = React.useState('');
  const [preparationDescription, setPreparationDescription] =
    React.useState('');
  const [addIngredientsData, setAddIngredientsData] = React.useState<any>([
    {
      id: null,
      quantity: null,
    },
  ]);
  //................Api Responce Data..................................................//
  const [ingredientsList, setIngredientsList] = React.useState([]);
  const [listSkinCareData, setListSkinCareData] = React.useState([]);
  //......................Models State ..............................................//
  const [addModelOpen, setAddModelOpen] = React.useState(false);
  const [viewModelOpen, setViewModelNameOpen] = React.useState(false);
  const [addAndEditModelName, setAddAndEditModelName] = React.useState('');
  const [viewAndDeleteModel, setViewAndDeleteModel] = React.useState('');
  const [getFiles, setGetFiles] = React.useState<any>('');
  const [images, setImages] = React.useState<any>('');

  const handleChange = (
    index: any,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const getData = [...addIngredientsData];
    getData[index].id = event.target.value;
    setAddIngredientsData(getData);
  };

  const openIngredientsDropDown = () => {
    let addAnotherField = [...addIngredientsData];
    addAnotherField.push({ ingredients: null, quantity: null });
    setAddIngredientsData(addAnotherField);
  };

  const handleQuantityChange = (
    index: any,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const quantityData = event.target.value;
    const getData = [...addIngredientsData];
    getData[index].quantity = quantityData;
    setAddIngredientsData(getData);
  };

  const deleteIngredientsFunction = (i: any) => {
    const getData = [...addIngredientsData];
    getData.splice(i, 1);
    setAddIngredientsData(getData);
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

  const openAddCategoriesModel = (name: any, value: any, index: any) => {
    setAddModelOpen(!addModelOpen);
    setAddAndEditModelName(name);
    if (name !== 'Add' && index !== '') {
      let editData: any = listSkinCareData && listSkinCareData[index];
      setRecipeName(editData.recipe_name);
      setRecipeDescription(editData.recipe_description);
      setSkinType(editData.skin_type);
      setSkinIssues(editData.skin_issues);
      setPreparationTime(editData.preparation_time);
      setPreparationDescription(editData.preparation_description);
      setImages(value.image);
    }
  };

  const viewAndDeleteModelOpen = (name: any, value: any, index: any) => {
    setViewModelNameOpen(!viewModelOpen);
    setViewAndDeleteModel(name);
  };

  React.useEffect(() => {
    let listData = {
      page_no: 2,
      page_limit: 10,
    };
    ListIngredientsApi(listData, onSuccessIngredientsList);
    let listSkinCare = {
      page_no: 1,
      page_limit: 10,
    };
    ListSkinCareApi(listSkinCare, onSuccessSkinCareList);
  }, []);

  const onSuccessIngredientsList = (response: any) => {
    setIngredientsList(response.data);
  };

  const onSuccessSkinCareList = (response: any) => {
    setListSkinCareData(response.data);
  };

  const addSkinCareItem = (keys: any) => {
    if (keys === 'Add') {
      imageUpload();
    } else {
      alert('Edit');
    }
  };

  const imageUpload = async () => {
    setIsLoading(true);
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
            recipe_name: recipeName,
            recipe_image: download_url,
            recipe_description: recipeDiscription,
            skin_type: skinType,
            skin_issues: skinIssues,
            ingredients: addIngredientsData,
            preparation_time: preparationTime,
            preparation_description: preparationDescription,
          };
          const storeIngredientsData = await AddSkinCareApi(
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
    setIsLoading(false);
    setAddModelOpen(!addModelOpen);
    setRecipeName('');
    setRecipeDescription('');
    setSkinType('');
    setSkinIssues('');
    setPreparationTime('');
    setPreparationDescription('');
    setAddIngredientsData([
      {
        id: null,
        quantity: null,
      },
    ]);
  };

  let getTableBodyData = listSkinCareData.map((item: any, index: any) => {
    let data = {
      name: item.recipe_name,
      image: item.recipe_image,
      description: item.recipe_description,
    };
    return data;
  });

  return (
    <div className={classes.root}>
      <SearchBar modelOpen={() => openAddCategoriesModel('Add', 'Add', '')} />
      <Customtable
        tableHeaders={tableHeader}
        tableBodyData={getTableBodyData}
        onEditFunction={(value: any, index: any) =>
          openAddCategoriesModel('Edit', value, index)
        }
        onViewFunction={(value: any, index: any) =>
          viewAndDeleteModelOpen('View', value, index)
        }
        onDeleteFunction={(value: any, index: any) =>
          viewAndDeleteModelOpen('Delete', value, index)
        }
        // paginationOnChange={handlePageChange}
        // page={pageValue}
        // pageCount={pageCount}
      />
      {/* .................................................Add and Edit Model..................................................... */}
      <CustomModel
        open={addModelOpen}
        close={() => setAddModelOpen(!addModelOpen)}
        Title={
          addAndEditModelName === 'Add'
            ? ' Add Skin Care Items'
            : 'Edit Skin Care Items'
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className={classes.textFieldStyle}
              margin='none'
              placeholder='Enter Recipe Name'
              variant='outlined'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              InputProps={{
                classes: { notchedOutline: classes.underline },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              value={recipeDiscription}
              onChange={(e) => setRecipeDescription(e.target.value)}
              className={classes.textAreaStyle}
              aria-label='minimum height'
              rowsMin={3}
              placeholder='Recipe Description'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className={classes.skinItemstextfield}
              placeholder='Enter Skin Type'
              variant='outlined'
              InputProps={{
                classes: { notchedOutline: classes.underline },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={skinIssues}
              onChange={(e) => setSkinIssues(e.target.value)}
              className={classes.skinItemstextfield}
              placeholder='Enter Skin Issue'
              variant='outlined'
              InputProps={{
                classes: { notchedOutline: classes.underline },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.addIngredientsStyle}>
              <div className={classes.skinItems}>
                <Typography>Add Ingredients</Typography>
                <AddIcon onClick={openIngredientsDropDown} />
              </div>
            </div>
          </Grid>
        </Grid>
        {addIngredientsData.map((item: any, index: any) => {
          return (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl
                  variant='outlined'
                  className={classes.SelectdropDownStyle}
                >
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Ingredients
                  </InputLabel>
                  <Select
                    label='Ingredients'
                    native
                    id='outlined-age-native-simple'
                    onChange={(event) => handleChange(index, event)}
                  >
                    <option aria-label='None' value='' />
                    {ingredientsList &&
                      ingredientsList.map((item: any, index: any) => {
                        return (
                          <option
                            style={{ paddingTop: 10, paddingBottom: 10 }}
                            key={index}
                            value={item._id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(index, event)}
                  className={classes.skinItemstextfield}
                  placeholder='Quantity'
                  variant='outlined'
                  InputProps={{
                    classes: { notchedOutline: classes.underline },
                  }}
                />
              </Grid>
              {addIngredientsData.length > 1 ? (
                <div style={{ width: '100%', zIndex: 100 }}>
                  <RemoveCircleOutlineIcon
                    onClick={() => deleteIngredientsFunction(index)}
                    className={classes.removeIngredientsStyle}
                  />
                </div>
              ) : (
                ''
              )}
            </Grid>
          );
        })}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
              className={classes.textFieldStyle}
              margin='none'
              placeholder='Preparation Time'
              variant='outlined'
              InputProps={{
                classes: { notchedOutline: classes.underline },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              value={preparationDescription}
              onChange={(e) => setPreparationDescription(e.target.value)}
              className={classes.textAreaStyle}
              aria-label='minimum height'
              rowsMin={3}
              placeholder='Preparation Description'
            />
          </Grid>
          <Grid item xs={12}>
            <CustomeUploadButton
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
              ButtonName='Recipe Image Upload'
              onChange={handleImageUpload}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.ImageplaceholderStyle}>
              {getFiles ? (
                <img
                  src={images}
                  alt='Skin care recipe image'
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
              ) : (
                ''
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                style={{ marginRight: 20, width: '20%' }}
                className={classes.uploadButtonStyle}
                onClick={() => setAddModelOpen(!addModelOpen)}
              >
                Cancel
              </Button>
              {addAndEditModelName === 'Add' ? (
                <Button
                  onClick={() => addSkinCareItem('Add')}
                  className={classes.addButtonStyle}
                >
                  {isLoading ? 'Adding item' : 'Add Items'}
                  {isLoading ? (
                    <i
                      style={{ fontSize: 15, marginLeft: 20 }}
                      className='fas fa-spinner fa-pulse'
                    ></i>
                  ) : (
                    ''
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => addSkinCareItem('Edit')}
                  className={classes.addButtonStyle}
                >
                  Edit Items
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </CustomModel>

      {/* ..........................................................View and Edit model............................................... */}
      {viewAndDeleteModel === 'View' ? (
        <CustomModel
          open={viewModelOpen}
          close={() => setViewModelNameOpen(!viewModelOpen)}
          Title='Skin Care Items'
        >
          <h1>Header</h1>
        </CustomModel>
      ) : (
        <CustomDeleteModel
          Deletemodel={viewModelOpen}
          closeDeleteModel={() => setViewModelNameOpen(!viewModelOpen)}
          titleName='Delete Skin Care Items.'
        />
      )}
    </div>
  );
}

export default SkinCare;

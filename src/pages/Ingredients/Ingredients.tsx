import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CustomModel from '../../components/Model/Model';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Page from '../../components/Page/Page';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

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
  },
  table: {
    width: '100%',
    margin: 'auto',
  },
  card: {
    backgroundColor: 'white',
    margin: 'auto',
  },
  addcategoriesStyle: {
    backgroundColor: theme.palette.green.main,
    cursor: 'pointer',
    color: 'white',
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
}));

const tableData = [
  { name: 'Ice-Cream', Calories: 1, Fat: 1, Carbs: 1, Protein: 1 },
  { name: 'Banana', Calories: 2, Fat: 2, Carbs: 2, Protein: 2 },
  { name: 'Orange', Calories: 3, Fat: 3, Carbs: 3, Protein: 3 },
  { name: 'Apple', Calories: 4, Fat: 4, Carbs: 4, Protein: 4 },
  { name: 'Potato', Calories: 5, Fat: 5, Carbs: 5, Protein: 5 },
  { name: 'Nuts', Calories: 6, Fat: 6, Carbs: 6, Protein: 6 },
  { name: 'Peanuts', Calories: 7, Fat: 7, Carbs: 7, Protein: 7 },
  { name: 'Butter', Calories: 8, Fat: 8, Carbs: 8, Protein: 8 },
  { name: 'Egg', Calories: 9, Fat: 9, Carbs: 9, Protein: 9 },
  { name: 'Chicken', Calories: 10, Fat: 10, Carbs: 10, Protein: 10 },
  { name: 'Mutton', Calories: 11, Fat: 11, Carbs: 11, Protein: 11 },
];

function DashBoard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [viewAndEditModel, setViewAndEditModel] = React.useState(false);
  const [viewAndDeleteData, setViewAndDeleteData] = React.useState<any>('');
  const [modelTitle2, setModelTitle2] = React.useState('');
  const [modelTitle, setModelTitle] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [calories, setCalories] = React.useState('');
  const [fat, setFat] = React.useState('');
  const [carbs, setCarbs] = React.useState('');
  const [protein, setProteins] = React.useState('');

  const openAddCategoriesModel = (type: any, values: any) => {
    setOpen(!open);
    setModelTitle(type);
    if (values !== 'Add') {
      setItemName(values.name);
      setCalories(values.Calories);
      setFat(values.Fat);
      setCarbs(values.Carbs);
      setProteins(values.Protein);
    }
  };

  const addAndEditFuntion = (type: any) => {
    if (type === 'Add') {
      setOpen(!open);
      setItemName('');
      setCalories('');
      setFat('');
      setCarbs('');
      setProteins('');
    } else {
      setOpen(!open);
    }
  };

  const viewAndDeleteModelOpen = (type: any, value: any) => {
    setViewAndEditModel(!viewAndEditModel);
    setModelTitle2(type);
    setViewAndDeleteData(value);
  };

  return (
    <div className={classes.root}>
      <Page title='Projects List' />
      <div className={classes.header}>
        <Grid
          alignItems='flex-end'
          container
          justify='space-between'
          spacing={3}
        >
          <Grid item>
            <Typography component='h1' variant='h3'>
              See the latest opportunities
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={() => openAddCategoriesModel('Add', 'Add')}
              className={classes.addcategoriesStyle}
            >
              <AddIcon className={classes.addIcon} />
              Add Items
            </Button>
          </Grid>
        </Grid>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(!open)}
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
              onClick={() => setOpen(!open)}
              style={{ float: 'right', marginTop: -25, cursor: 'pointer' }}
            />
            <div style={{ paddingTop: 20 }}>
              <TextField
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className={classes.ItemNamestyle}
                label='Item Name'
              />
            </div>
            <div className={classes.textfieldStyles}>
              <TextField
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className={classes.materialtextfieldstyle}
                label='Calories'
              />
              <TextField
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className={classes.materialtextfieldstyle}
                label='Fat'
              />
            </div>
            <div className={classes.textfieldStyles}>
              <TextField
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className={classes.materialtextfieldstyle}
                label='Carbs'
              />
              <TextField
                value={protein}
                onChange={(e) => setProteins(e.target.value)}
                className={classes.materialtextfieldstyle}
                label='Proteins'
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
                onClick={
                  modelTitle === 'Add'
                    ? () => addAndEditFuntion('Add')
                    : () => addAndEditFuntion('Edit')
                }
                className={classes.addButtonStyle}
              >
                {modelTitle === 'Add' ? 'Add' : 'Edit'}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className={classes.card}>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align='center'>Calories</TableCell>
                <TableCell align='center'>Fat</TableCell>
                <TableCell align='center'>Carbs</TableCell>
                <TableCell align='center'>Protein</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((value, index) => {
                return (
                  <TableRow hover style={{ cursor: 'pointer' }} key={index}>
                    <TableCell component='th' scope='row'>
                      {value.name}
                    </TableCell>
                    <TableCell align='center'>{value.Calories}</TableCell>
                    <TableCell align='center'>{value.Fat}</TableCell>
                    <TableCell align='center'>{value.Carbs}</TableCell>
                    <TableCell align='center'>{value.Protein}</TableCell>
                    <TableCell align='center'>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Tooltip title='View' arrow>
                          <IconButton style={{ padding: 5 }}>
                            <CenterFocusStrongIcon
                              style={{ color: '#41A58D' }}
                              onClick={() =>
                                viewAndDeleteModelOpen('View', value)
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit' arrow>
                          <IconButton style={{ padding: 5 }}>
                            <EditIcon
                              style={{ color: '#41A58D' }}
                              onClick={() =>
                                openAddCategoriesModel('Edit', value)
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete' arrow>
                          <IconButton style={{ padding: 5 }}>
                            <DeleteIcon
                              style={{ color: '#41A58D' }}
                              onClick={() =>
                                viewAndDeleteModelOpen('Delete', value)
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
            <div>
              <Grid container>
                <Grid item xs={6}>
                  <Typography className={classes.viewmodelText}>
                    Dessert
                  </Typography>
                  <Typography className={classes.viewmodelText}>
                    Calories
                  </Typography>
                  <Typography className={classes.viewmodelText}>Fat</Typography>
                  <Typography className={classes.viewmodelText}>
                    Carbs
                  </Typography>
                  <Typography className={classes.viewmodelText}>
                    Protein
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.viewmodelText}>
                    {viewAndDeleteData.name}
                  </Typography>
                  <Typography className={classes.viewmodelText}>
                    {viewAndDeleteData.Calories}
                  </Typography>
                  <Typography className={classes.viewmodelText}>
                    {viewAndDeleteData.Fat}
                  </Typography>
                  <Typography className={classes.viewmodelText}>
                    {viewAndDeleteData.Carbs}
                  </Typography>
                  <Typography className={classes.viewmodelText}>
                    {viewAndDeleteData.Protein}
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ marginTop: 30 }} />
            </div>
          ) : (
            <Typography style={{ fontSize: 18, paddingTop: 20 }}>
              Are you sure want to delete this item ?
            </Typography>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '20px',
            }}
          >
            {modelTitle2 === 'View' ? (
              <Button className={classes.addButtonStyle}>Ok</Button>
            ) : (
              <div>
                <Button
                  style={{
                    backgroundColor: 'white',
                    color: '#41A58D',
                    border: '2px solid #41A58D',
                    textTransform: 'capitalize',
                    marginRight: 40,
                  }}
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
                >
                  Yes
                </Button>
              </div>
            )}
          </div>
        </div>
      </CustomModel>
    </div>
  );
}

export default DashBoard;

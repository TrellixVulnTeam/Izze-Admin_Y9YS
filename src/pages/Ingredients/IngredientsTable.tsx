import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import CustomModel from '../../components/Model/Model';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Tooltip from '@material-ui/core/Tooltip';

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
}));

function IngredientsTable(props: any) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.card}>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Ingredients Name</TableCell>
                <TableCell align='center'>Image</TableCell>
                <TableCell align='center'>Discription</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props &&
                props.TableData.map((value: any, index: any) => {
                  return (
                    <TableRow hover style={{ cursor: 'pointer' }} key={index}>
                      <TableCell component='th' scope='row'>
                        {value.name}
                      </TableCell>
                      <TableCell align='center'>
                        <Tooltip title='Add' aria-label='add'>
                          <Typography>{value.image}</Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography>{value.description}</Typography>
                      </TableCell>
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
                                // onClick={() =>
                                //   viewAndDeleteModelOpen('View', value)
                                // }
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Edit' arrow>
                            <IconButton style={{ padding: 5 }}>
                              <EditIcon
                                style={{ color: '#41A58D' }}
                                // onClick={() =>
                                //   openAddCategoriesModel('Edit', value)
                                // }
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Delete' arrow>
                            <IconButton style={{ padding: 5 }}>
                              <DeleteIcon
                                style={{ color: '#41A58D' }}
                                // onClick={() =>
                                //   viewAndDeleteModelOpen('Delete', value)
                                // }
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
    </div>
  );
}

export default IngredientsTable;

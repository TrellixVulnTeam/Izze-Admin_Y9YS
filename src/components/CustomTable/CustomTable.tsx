import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Tooltip from '@material-ui/core/Tooltip';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme: any) => ({
  table: {
    width: '100%',
    margin: 'auto',
  },
  card: {
    backgroundColor: 'white',
    margin: 'auto',
  },
  paginationpadding: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  paginationstyle: {
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.palette.green.main,
      color: 'white',
    },
  },
  noDataFoundStyle: {
    textAlign: 'center',
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    fontSize: 25,
  },
}));

function CustomTable(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {props.tableHeaders.map((item: any, index: any) => {
                return (
                  <TableCell
                    key={index}
                    align={item !== 'S.No' ? 'center' : 'left'}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableBodyData &&
              props.tableBodyData.map((value: any, index: any) => {
                return (
                  <TableRow hover style={{ cursor: 'pointer' }} key={index}>
                    <TableCell component='th' scope='row'>
                      {index + 1}
                    </TableCell>
                    <TableCell align='center'>{value.name}</TableCell>
                    <TableCell align='center'>
                      <Tooltip title={value.image} aria-label='add'>
                        <Typography>
                          {value.image.length >= 25
                            ? `${value.image.substring(0, 40)}...`
                            : value.image}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip title={value.description} aria-label='add'>
                        <Typography>
                          {value.description.length >= 25
                            ? `${value.description.substring(0, 40)}...`
                            : value.description}
                        </Typography>
                      </Tooltip>
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
                              onClick={() => props.onViewFunction(value, index)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit' arrow>
                          <IconButton style={{ padding: 5 }}>
                            <EditIcon
                              style={{ color: '#41A58D' }}
                              onClick={() => props.onEditFunction(value, index)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete' arrow>
                          <IconButton style={{ padding: 5 }}>
                            <DeleteIcon
                              style={{ color: '#41A58D' }}
                              onClick={() =>
                                props.onDeleteFunction(value, index)
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
        {props.tableBodyData.length === 0 ? (
          <Typography className={classes.noDataFoundStyle}>
            No data Found
          </Typography>
        ) : (
          ''
        )}
      </TableContainer>
      {props.tableBodyData.length <= 10 ? (
        <div className={classes.paginationpadding}>
          <Pagination
            className={classes.paginationstyle}
            count={
              props.tableBodyData ? props.pageCount + 1 : props.pageCount - 1
            }
            page={props.page}
            onChange={props.paginationOnChange}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default CustomTable;

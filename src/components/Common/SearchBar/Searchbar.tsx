import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: any) => ({
  addcategoriesStyle: {
    backgroundColor: theme.palette.green.main,
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.green.main,
      color: 'white',
    },
  },
  searchbar: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchtextField: {
    width: '50%',
  },
  addIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Searchbar(props: any) {
  const classes = useStyles();
  return (
    <div className={classes.searchbar}>
      <TextField
        className={classes.searchtextField}
        placeholder='Search Products'
        variant='outlined'
      />
      <Button
        variant='contained'
        onClick={props.modelOpen}
        className={classes.addcategoriesStyle}
      >
        <AddIcon className={classes.addIcon} />
        Add Items
      </Button>
    </div>
  );
}

export default Searchbar;

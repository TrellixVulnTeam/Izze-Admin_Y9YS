import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  selectRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white !important'
    }
  },
  selectIcon: {
    right: 0
  },
  formControlRoot: {
    minWidth: 'unset'
  }
}));

const UnitSelect = (props: any) => {
  const [{
    value = '',
    name = '',
    id = 'tempID',
    option = [],
    placeholder = 'Unit',
    onChange = new Function,
    onBlur = new Function,
  }, setProps] = useState(props)

  const classes = useStyles()
  useEffect(() => {
    setProps(props)
  }, [props])

  return (
    <FormControl variant="outlined" className={classes.formControlRoot}>
      <InputLabel id={id} shrink={false} >
        {value == '' && placeholder}
      </InputLabel>
      <Select
        labelId={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classes.selectRoot}
        classes={{
          icon: classes.selectIcon
        }}
      >
        {option.map(({ id, name }: any, i: any) => <MenuItem key={i} value={id}>{name}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

export default UnitSelect;




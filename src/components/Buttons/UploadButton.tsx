import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  uploadButtonStyle: {
    backgroundColor: 'white',
    textTransform: 'capitalize',
    color: theme.palette.green.main,
    border: `1px solid ${theme.palette.green.main}`,
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.green.main,
      border: `1px solid ${theme.palette.green.main}`,
    },
  },
}));

function UploadButton(props: any) {
  const classes = useStyles();
  return (
    <div>
      <div style={props.style}>
        <label htmlFor='upload-images'>
          <input
            id='upload-images'
            name='upload-images'
            type='file'
            accept='.jpg,.png,jpeg'
            onChange={props.onChange}
            hidden
          />
          <Button
            style={props.ButtonStyle}
            className={classes.uploadButtonStyle}
            variant='contained'
            component='span'
          >
            <i
              style={{ paddingRight: '10px' }}
              className='fas fa-cloud-upload-alt'
            ></i>
            {props.ButtonName}
          </Button>
        </label>
      </div>
    </div>
  );
}

export default UploadButton;

import React from 'react';
import DialogModel from '../DialogBox/DialogBox';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

function CustomeDeleteModel(props: any) {
  const classes = useStyles();
  return (
    <div>
      <DialogModel
        small
        open={props.Deletemodel}
        close={props.closeDeleteModel}
        Title={props.titleName}
      >
        <div>
          <Typography style={{ fontSize: 18, paddingTop: 5 }}>
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
                onClick={props.closeDeleteModel}
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
                // onClick={confirmDeleteIngredients}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </DialogModel>
    </div>
  );
}

export default CustomeDeleteModel;

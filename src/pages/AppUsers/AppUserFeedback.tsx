import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardMedia,
  Avatar,
  Link,
  Typography,
  Divider,
  Input,
  Paper,
  Tooltip,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SendIcon from '@material-ui/icons/Send';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import { TableLoader, TableNoData } from '../../components/Loader/Loader';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  accessTimeIcon: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    height: 14,
    width: 14,
    marginRight: 6
  },
  content: {
    paddingTop: 0
  },
  message: {
    marginBottom: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  replayInsertDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  replayListDiv: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  bubble: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  time: {
    marginLeft: 'auto'
  },
  replayMessage: {
    marginTop: theme.spacing(1)
  },
  actions: {
    display: 'flex',
    padding: theme.spacing(2, 1),
    justifyContent: 'center',
  },
  lColor: {
    color: theme.palette.green.main,
  }

}));

const AppUserFeedback = (props: any) => {
  const classes = useStyles();
  const { data } = props;
  const { Post } = useService();
  const Snackbar = useSnackbar();
  // const ConfModel = useConfModel();

  const [stateData, setStateData] = useState({ page_no: 1, page_limit: 10, id: '' });
  const [pageCount, setPageCount] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const listFeedback = async (data: any = stateData) => {
    setLoading(true);
    Post('app/listFeedback', data)
      .then((res: any) => {
        console.log('listFeedback', res);
        setLoading(false);
        if (!res.error) {
          setDataList(res.data);
          setPageCount(res.page_count);
        } else {
          Snackbar.show(res.message, 'error');
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        setLoading(false);
        Snackbar.show(err.message, 'error');
      });
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setStateData((prevState: any) => ({ ...prevState, page_no: value }));
    listFeedback({ ...stateData, page_no: value })
  };

  useEffect(() => {
    setStateData((prevData) => ({ ...prevData, id: data._id }))
    listFeedback({ ...stateData, id: data._id })
  }, [props]);

  return (
    <>
      {!loading && dataList.map((data: any, index: number) => <FeedbackCard data={data} />)}
      {loading && <div className={classes.actions}><CircularProgress className={classes.lColor} /></div>}
      {!loading && dataList.length == 0 && <div className={classes.actions}>No Feedback</div>}
      <div className={classes.actions}>
        <Pagination
          count={pageCount}
          page={stateData.page_no}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

const FeedbackCard = (props: any) => {
  const classes = useStyles();
  const { data } = props;
  const { Post } = useService();
  const Snackbar = useSnackbar()
  const [formData, setFormData] = useState<any>(data);
  const [replayText, setReplayText] = useState('');
  const [loading, setLoading] = useState(false);

  const replaySubmit = () => {
    setLoading(true);
    Post('app/postReplay', { id: formData._id, replay: replayText })
      .then((res: any) => {
        console.log('postReplay', res);
        setLoading(false);
        formData.replay.push(res.data);
        setFormData((prevState: any) => formData)
        setReplayText('')
      })
      .catch((err: any) => {
        console.log('err', err);
        setLoading(false);
        Snackbar.show(err.message, 'error');
      });
  };


  const handleReplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplayText(e.target.value)
  }


  useEffect(() => {
    setFormData(data)
  }, [props]);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar alt={formData?.name} src={formData?.profilePic} />
        }
        disableTypography
        subheader={
          <div className={classes.subheader}>
            <AccessTimeIcon className={classes.accessTimeIcon} />
            <Typography variant="body2">
              {moment(formData?.created_at).fromNow()}
            </Typography>
          </div>
        }
        title={formData?.name}
      />
      <CardContent className={classes.content}>
        <Typography className={classes.message} variant="body1">
          {formData?.feedback}
        </Typography>

        {!(formData?.replay.length == 0) && <Divider className={classes.divider} />}
        {formData?.replay && formData?.replay.map((data: any, index: number) => <FeedbackReplayCard key={index} data={data} />)}

        <Divider className={classes.divider} />
        <div className={classes.replayInsertDiv} >
          <Paper
            className={classes.paper}
            elevation={1}
          >
            <Input
              value={replayText}
              className={classes.input}
              disableUnderline
              onChange={handleReplayChange}
              placeholder="Leave a replay"
            />
          </Paper>
          <Tooltip title="Send">
            <IconButton color='primary' disabled={loading} onClick={replaySubmit}>
              <SendIcon />
            </IconButton>
          </Tooltip>

        </div>


      </CardContent>
    </Card>

  )
}

const FeedbackReplayCard = React.memo((props: any) => {
  const classes = useStyles();
  const { data } = props;
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    console.log('data', data)
    setFormData(data)
  }, [props]);
  return (

    <div className={classes.replayListDiv}>
      <Avatar alt={formData?.replay_by_name} src={formData?.replay_by_image} />
      <div className={classes.bubble}>
        <div className={classes.header}>
          <Typography color="textPrimary" variant="h6">
            {formData?.replay_by_name}
          </Typography>
          <Typography className={classes.time} variant="body2" >
            {moment(formData?.created_at).fromNow()}
          </Typography>
        </div>
        <Typography className={classes.replayMessage} variant="body1" >
          {formData?.feedback_replay}
        </Typography>
      </div>
    </div>
  )
})

export default AppUserFeedback;

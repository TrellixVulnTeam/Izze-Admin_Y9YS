// eslint-disable-next-line
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    message: ''
  };

  static getDerivedStateFromError(_error: Error) {
    console.log('Error Caught on Error Boundary', _error.message, _error);
    return { hasError: true, message: _error.message };
  }

  componentDidCatch(error: any, info: any) {
    // ErrorLogger.LogError(error, info);
  }

  refreshPage = () => {
    window && window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    if (!hasError) return this.props.children;
    else {
      return (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography component={'h1'} variant="h3">
            oops! something went wrong.
          </Typography>
          <Typography component={'h1'} variant="h5">
            {' '}
            We regret for the inconvenience.
          </Typography>
          <Button
            onClick={this.refreshPage}
            style={{
              marginTop: 10,
              background: '#fae2e0',
              color: '#ff4f4f'
            }}
          >
            {' '}
            Reload App{' '}
          </Button>
        </div>
      );
    }
  }
}

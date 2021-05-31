import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routes/index';
import ErrorBoundary from "./components/ErrorBoundary";
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
      {/* <MuiThemeProvider theme={THEME}>
        <SnackbarContextProvider> */}
      <Router>
        <Suspense fallback={<div>Loading</div>}>
          <Routers />
        </Suspense>

      </Router>
      {/* </SnackbarContextProvider>
      </MuiThemeProvider> */}
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

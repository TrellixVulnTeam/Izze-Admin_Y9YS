import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routes/index';
import ErrorBoundary from './components/ErrorBoundary';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';
import { Provider as MobxProvider } from 'mobx-react';
import Stores from './Mobx/Stores';
import FirebaseApp from './utils/FirebaseInit';
import SnackbarProvider from './hook/SnackbarProvider';
import { ServiceProvider } from './hook/useService';
import Loader from './components/Loader/Loader';
import './TipTap.scss'

FirebaseApp.InitializeApp();

function App() {
  return (
    <MobxProvider stores={Stores}>
      <ErrorBoundary>
        <ServiceProvider>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              <Router>
                <Suspense fallback={<Loader />}>
                  <Routers />
                </Suspense>
              </Router>
            </ThemeProvider>
          </SnackbarProvider>
        </ServiceProvider>
      </ErrorBoundary>
    </MobxProvider>
  );
}

export default App;

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

FirebaseApp.InitializeApp();

function App() {
  return (
    <MobxProvider stores={Stores}>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Router>
            <Suspense fallback={<div>Loading</div>}>
              <Routers />
            </Suspense>
          </Router>
        </ThemeProvider>
      </ErrorBoundary>
    </MobxProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from '../pages/SignIn/SignIn';
import TopbarComponent from '../components/TopBar/Topbar';
import DashBoardPage from '../pages/DashBoard/DashBoard';

function Routers() {
  return (
    <div>
      <Router>
        {/* <Route exact path='/' component={LoginPage} /> */}
        <Route
          exact
          path='/'
          render={(props) => (
            <TopbarComponent {...props}>
              <LoginPage />
            </TopbarComponent>
          )}
        />
        <Route
          exact
          path='/dashboard'
          render={(props) => (
            <TopbarComponent {...props}>
              <DashBoardPage />
            </TopbarComponent>
          )}
        />
      </Router>
    </div>
  );
}

export default Routers;

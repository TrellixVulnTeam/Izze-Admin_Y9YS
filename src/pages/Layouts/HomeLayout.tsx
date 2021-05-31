import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../../components/TopNavBar/TopNavBar';

const HomeLayout = () => {
  return (
    <TopNavBar>
      <Outlet />
    </TopNavBar>
  );
};

export default HomeLayout;

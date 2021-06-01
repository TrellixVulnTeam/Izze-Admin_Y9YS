import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import useService from '../../hook/useService';
import useSnackbar from '../../hook/useSnackbar';
import { useStore } from '../../Mobx/Helpers/UseStore';
import { SigninRoute } from '../../Routes/RoutesConstants';
import { AuthStateChange } from '../../utils/firebaseUtils';

const HomeLayout = () => {
  const { Post, Logout } = useService()
  const { UserStore } = useStore()
  const Snackbar = useSnackbar()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const authStateChanged = (user: any) => {
    setLoading(true)
    if (user) {
      localStorage.setItem('uid', user.uid);
      UserStore.setIdToken(user.uid);
      Post('app/login').then((res: any) => {
        console.log('login Res',res)
        setLoading(false)
      }).catch((err: any) => {
        console.log('login err',err.statusCode)
        Snackbar.show(err.message, 'error');
        Logout().then(() => navigate(SigninRoute))
      })
    } else {
      Logout().then(() => navigate(SigninRoute))
    }
  };

  useEffect(() => {
    const unsubscribe = AuthStateChange(authStateChanged);
    return () => unsubscribe();
  }, []);

  return (

    <>
      {loading ?  <Loader /> : <TopNavBar>
        <Outlet />
      </TopNavBar>}
    </>

  );
};

export default HomeLayout;

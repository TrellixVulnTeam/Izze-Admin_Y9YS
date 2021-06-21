import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { AuthStateChange } from '../../utils/FirebaseUtils';

const AuthLayout = () => {

  const [loading, setLoading] = useState(true)

  const authStateChanged = (user: any) => {
    console.log('login State', user)
    setLoading(true)
    if (!user) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  };

  useEffect(() => {
    const unsubscribe = AuthStateChange(authStateChanged);
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main>
        {loading ? <Loader /> : <Outlet />}
      </main>
    </>
  )
}

export default AuthLayout
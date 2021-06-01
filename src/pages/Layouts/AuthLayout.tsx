import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { AuthStateChange } from '../../utils/firebaseUtils';


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
      {loading ? <Loader /> : <Outlet />}
    </>
  )
}

export default AuthLayout
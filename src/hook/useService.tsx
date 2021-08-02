import React, { useContext, createContext, useState } from 'react';
import MobxObserver from '../Mobx/Helpers/MobxObserver';
import { useStore } from '../Mobx/Helpers/UseStore';
import { PostApi } from '../utils/ApiService';
import { LogoutUser } from '../utils/FirebaseUtils';
import useSnackbar from './useSnackbar';

export const ServiceContext = React.createContext<any>(null);

export const ServiceProvider = MobxObserver((props: any) => {
  const { children } = props;
  const { UserStore } = useStore();
  const Snackbar = useSnackbar();

  const PostService = (url: string, data: any = {}) => {
    return new Promise((resolve, reject) => {
      PostApi(url, data, UserStore.IdToken)
        .then(resolve)
        .catch((err: any) => {
          const { statusCode } = err
          if (statusCode == 401) {
            Snackbar.show(err.message, 'error');
            return LogoutUser()
          }
          return reject(err)
        })
    })
  };

  const ProviderValue = {
    Post: PostService,
    Logout: LogoutUser,
  };
  return (
    <ServiceContext.Provider value={ProviderValue}>
      {children}
    </ServiceContext.Provider>
  );
});

const useService = () => {
  return useContext(ServiceContext);
};

export default useService;

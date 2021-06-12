import React, { useContext, createContext, useState } from 'react';
import MobxObserver from '../Mobx/Helpers/MobxObserver';
import { useStore } from '../Mobx/Helpers/UseStore';
import { PostApi } from '../utils/ApiService';
import { LogoutUser } from '../utils/FirebaseUtils';

export const ServiceContext = React.createContext<any>(null);

export const ServiceProvider = MobxObserver((props: any) => {
  const { children } = props;
  const { UserStore } = useStore();

  const PostService = (url: string, data: any = {}) => {
    return PostApi(url, data, UserStore.IdToken);
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

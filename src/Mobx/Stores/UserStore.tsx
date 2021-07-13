import { action, computed, observable } from 'mobx';

class UserStore {

  @observable IdToken: string | null = null;
  @observable UserDetails: any = {};
  @observable MenuConfig: any = [];

  @action
  setIdToken = (idToken: string) => {
    this.IdToken = idToken;
  }

  @action
  setUserDetails = (userDetails: any) => {
    this.UserDetails = userDetails;
  }

  @action
  setMenuConfig = (MenuConfig: any) => {
    this.MenuConfig = MenuConfig;
  }
}

export default new UserStore();



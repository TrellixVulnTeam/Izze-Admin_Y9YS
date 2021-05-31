import { action, computed, observable } from 'mobx';

class UserStore {

  @observable IdToken: string | null = null;
  @observable UserDetails: any = {};

  @action
  setIdToken = (idToken: string) => {
    this.IdToken = idToken;
  }

  @action
  setUserDetails = (userDetails: any) => {
    this.UserDetails = userDetails;
  }
}

export default new UserStore();



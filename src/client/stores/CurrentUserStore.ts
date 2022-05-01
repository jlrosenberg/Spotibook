import { action, makeObservable, observable } from "mobx";

export class CurrentUserStore {
  private static instance: CurrentUserStore;
  user: any = null;

  private constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
      // getIsLoggedIn: computed,
    });
  }

  static getInstance(): CurrentUserStore {
    if (!CurrentUserStore.instance) {
      CurrentUserStore.instance = new CurrentUserStore();
    }
    return CurrentUserStore.instance;
  }

  getIsLoggedIn() {
    return !!this.user;
  }

  setUser = (user: any) => {
    this.user = user;
  };
}

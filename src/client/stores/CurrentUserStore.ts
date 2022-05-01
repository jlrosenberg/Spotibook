import { action, makeObservable, observable } from "mobx";

export class CurrentUserStore {
  private static instance: CurrentUserStore;
  user: any = null;

  private constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  static getInstance(): CurrentUserStore {
    if (!CurrentUserStore.instance) {
      CurrentUserStore.instance = new CurrentUserStore();
    }
    return CurrentUserStore.instance;
  }

  setUser = (user: any) => {
    this.user = user;
  };
}

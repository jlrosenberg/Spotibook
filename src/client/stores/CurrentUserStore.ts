import { action, observable } from "mobx";

export class CurrentUserStore {
	private static instance: CurrentUserStore;
	@observable private user: any;


	private constructor() {
		this.user = null;
	}

	static getInstance(): CurrentUserStore {
		if (!CurrentUserStore.instance) {
			CurrentUserStore.instance = new CurrentUserStore();
		}
		return CurrentUserStore.instance;
	}

	getUser = () => {
		return this.user;
	}

	@action
	setUser = (user: any) => {
		this.user = user;
	}

}

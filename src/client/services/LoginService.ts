import * as $ from "jquery";
import { CurrentUserStore } from "../stores/CurrentUserStore";
export class LoginService {
  static getIsLoggedIn = async (): Promise<boolean> => {
    const res = await $.get("/api/v1/logged_in");
    console.log(res);
    CurrentUserStore.getInstance().setUser(res);
    return res;
  };

  static login = async (info: {email: string, password: string}): Promise<any> => {
    const res = await $.ajax('/api/v1/login', {
      data: JSON.stringify(info),
      dataType: "json",
      method: "POST",
      contentType: "application/json",
    });
    console.log(res);
    CurrentUserStore.getInstance().setUser(res);
    return res;
  }

  static logout = async(): Promise<void> => {
    await $.get("/api/v1/logout");
    CurrentUserStore.getInstance().setUser(null);
  }
}

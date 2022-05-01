import * as $ from "jquery";
import { CreateUserPayload } from "../../shared/models/user";
import { UserPayload } from "../../shared/payloads";
import { CurrentUserStore } from "../stores/CurrentUserStore";

export class ProfileService {
  static getProfile = async (profileId: any): Promise<UserPayload> => {
    const res = await $.get(`/api/v1/users/${profileId}`);
    return res;
  };

  static getProfiles = async (): Promise<Array<UserPayload>> => {
    const res = await $.get("/api/v1/users");
    return res;
  };

  static followProfile = async (profileId: any): Promise<any> => {
    const res = await $.post(`/api/v1/users/${profileId}/follow`);
    return res;
  };

  static updateProfile = async(userId: string, user: any): Promise<any> => {
    const res = await $.ajax(`/api/v1/users/${userId}`, {
      data: JSON.stringify(user),
      dataType: "json",
      method: "PATCH",
      contentType: "application/json",
    });
    console.log(res)
    CurrentUserStore.getInstance().setUser(res);
    return res;

  }

  static createProfile = async (
    profile: CreateUserPayload
  ): Promise<UserPayload> => {
    const res = await $.ajax("/api/v1/users", {
      data: JSON.stringify(profile),
      dataType: "json",
      method: "POST",
      contentType: "application/json",
    });
    console.log(res);
    return res;
  };
}

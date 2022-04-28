import * as $ from "jquery";
import { UserPayload } from "../../shared/payloads";

export class ProfileService {
  static getProfile = async (profileId: any): Promise<UserPayload> => {
    const res = await $.get(`/api/v1/profile/${profileId}`);
    return res;
  };
}

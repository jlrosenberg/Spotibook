import * as $ from 'jquery';
import { Profile } from '../../shared/models/profile';

export class ProfileService {

  static getProfile = async (profileId: any): Promise<Profile> => {
    const res = await $.get(`/api/v1/profile/${profileId}`)
    return res;
  }
}
import * as $ from 'jquery';
export class FeedService {

  static getFeed = async (): Promise<Array<any>> => {
    const res = await $.get('/api/v1/posts')
    return res
  }

  static createPost = async(post: any): Promise<any> => {
    console.log('posting')
    const res = await $.ajax('/api/v1/posts', {
      data: JSON.stringify(post),
      dataType: "json",
      method: "POST",
      contentType: "application/json",
    });
    return res
  }

  static getPostsForUser = async(userId: any): Promise<Array<any>> => {
    const res = await $.get(`/api/v1/users/${userId}/posts`)
    return res
  }

  static getPostsForSong = async(songId: any): Promise<Array<any>> => {
    const res = await $.get(`/api/v1/songs/${songId}/posts`)
    return res
  }
}
import * as $ from 'jquery';
export class FeedService {

  static getFeed = async (): Promise<Array<any>> => {
    const res = await $.get('/api/feed')
    return res.posts
  }
}
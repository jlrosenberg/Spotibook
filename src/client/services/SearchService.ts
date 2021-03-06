

import * as $ from 'jquery';
export class SearchService {

  static searchForSongs = async (searchTerm: string): Promise<Array<any>> => {
    const res = await $.ajax("/api/v1/songs/search", {
        data: JSON.stringify({searchTerm: searchTerm}),
        dataType: "json",
        method: "POST",
        contentType: "application/json",
      });
    console.log(res);
    return res
  }

  static getSongById = async (songId: string): Promise<any> => {
    const res = await $.get(`/api/v1/songs/${songId}`);
    return res
  }
}
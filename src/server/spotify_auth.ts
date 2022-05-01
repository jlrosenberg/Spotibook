import SpotifyWebApi from "spotify-web-api-node";

let client: SpotifyWebApi;

export const spotifyAuthorize = async () => {
  let spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  let data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
  client = spotifyApi;
  return spotifyApi;
};

// use singleton pattern for spotify api client
export const getSpotifyApi = () => {
  return client;
}
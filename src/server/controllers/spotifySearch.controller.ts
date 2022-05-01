import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { getSpotifyApi } from "../spotify_auth";
import type { Request, Response } from 'express'

interface SongSearchRequestPayload {
    searchTerm: string
}

export const searchForSongs = async (req: Request<SongSearchRequestPayload>, res: Response) => {
    const spotify = getSpotifyApi()
    const songs = await spotify.searchTracks(req.body.searchTerm, { limit: 10 })

    res.json(songs.body.tracks.items)
    // const res = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`);
}
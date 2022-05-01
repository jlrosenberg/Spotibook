import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { FeedService } from "../../services/FeedService";
import { SearchService } from "../../services/SearchService";

export const PostCreationCard = () => {
  const [songs, setSongs] = useState<any>([]);
  const [song, setSong] = useState<any>();
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const searchForSongs = async (term: string) => {
    const newSongs = await SearchService.searchForSongs(term);
    // console.log(newSongs);
    setSongs(newSongs);
  };

  const onSubmitClicked = async () => {
    console.log("create post on backend");

    setSubmitting(true);
    const res = await FeedService.createPost({
      message,
      songId: song.id,
      explicit: true,
    });
    console.log(res);
  };
  return (
    <Card>
      <CardHeader title="Share something new with your spotibook squad" />
      <CardContent>
        <TextField
          placeholder="How's it goin?"
          label="Message"
          fullWidth
          autoComplete="false"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Autocomplete
          autoComplete
          options={songs}
          onChange={(_event: any, newValue: any) => {
            setSong(newValue);
            console.log("onChangeFired");
            console.log("new value is", newValue);
          }}
          onInputChange={(_event: any, newInputValue: string) => {
            console.log("ON INPUT CHANGE");
            searchForSongs(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Start typing song name here" />
          )}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option: any) => (
            <SongOption notsure={props} song={option} />
          )}
        />
        {/* Render song preview below if we have a song selected */}
        {song && (
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`}
            width="100%"
            height="80"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        )}
      </CardContent>

      <CardActions>
        <Button
          disabled={!message || !song || submitting}
          onClick={onSubmitClicked}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

const useOptionStyles = makeStyles({
  container: {
    height: "50px",
    marginBottom: '4px',
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  image: {
    marginRight: "4px",
  },
});

interface SongOptionProps {
  song: any;
  notsure: any;
}
const SongOption: React.FC<SongOptionProps> = ({ song, notsure }) => {
  const classes = useOptionStyles();
  console.log(song);
  console.log(notsure);
  const artist = song?.artists[0].name;
  const image = song?.album?.images[0];
  return (
    <ListItem {...notsure} className={classes.container}>
      {image && (
        <img
          className={classes.image}
          src={image?.url}
          height="50"
          width="50"
        ></img>
      )}
      <div className={classes.text}>
        <Typography variant="button">{song?.name}</Typography>
        <Typography variant="overline">{artist}</Typography>
      </div>
    </ListItem>
  );
};

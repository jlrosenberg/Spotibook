import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FeedService } from "../../services/FeedService";
import { CurrentUserStore } from "../../stores/CurrentUserStore";
import { SongPicker } from "../SongPicker";

export const PostCreationCard = () => {
  const [song, setSong] = useState<any>();
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const user = CurrentUserStore.getInstance().user;
  const isChild = user.role === "CHILD";

  const onSubmitClicked = async () => {
    console.log("create post on backend");

    setSubmitting(true);
    await FeedService.createPost({
      message,
      songId: song.id,
      explicit: song.explicit,
    });
    setSubmitting(false);
    // console.log(res);
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
        <SongPicker onSongSelected={setSong} filterExplicit={isChild} />
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
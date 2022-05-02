import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedService } from "../../services/FeedService";
import { CurrentUserStore } from "../../stores/CurrentUserStore";
import { SongPicker } from "../SongPicker";
import Filter from "bad-words";
export const PostCreationCard = () => {
  const [song, setSong] = useState<any>();
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const user = CurrentUserStore.getInstance().user;
  const isChild = user.role === "CHILD";
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  const filter = new Filter();

  const onSubmitClicked = async () => {
    if (!isLoggedIn) {
      alert(
        "You must be logged in to create a post. You will be redirected to login page"
      );
      navigate("/login");
    } else {
      if (isChild && filter.isProfane(message!)) {
        alert(
          "Children cannot use profane words in posts. Please clean up your language and try again"
        );
        return;
      }
      setSubmitting(true);
      await FeedService.createPost({
        message,
        songId: song.id,
        explicit: song.explicit,
      });
      setMessage(undefined);
      setSong(undefined);
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader title="You must be logged in to create a post" />
        <CardActions>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              navigate("/login");
            }}
          >
            Click here to log in
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              navigate("/register");
            }}
          >
            Click here to register
          </Button>
        </CardActions>
      </Card>
    );
  }

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

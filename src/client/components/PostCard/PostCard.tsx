import { ThumbUp, Share, Comment } from "@mui/icons-material";
import { Card, CardHeader, Avatar, IconButton, CardContent, CardActions, Theme, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {PostPayload} from '../../../shared/payloads';
import { makeStyles } from "@mui/styles";

interface Props {
  post: PostPayload;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    paddingBottom: theme.spacing(0.5),
  },
  content: {
    paddingTop: '0px !important',
  }
}))
export const PostCard: React.FC<Props> = ({ post }) => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={post.user.avatar}>{post.user.name.charAt(0)}</Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        // TODO add a real date-time library and format this more human readable
        subheader={new Date(post.createdAt).toLocaleString()}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <Typography paragraph>{post.message}</Typography>
        <iframe
          style={{borderRadius:'12px'}}
          src={`https://open.spotify.com/embed/track/${post.songId}?utm_source=generator`}
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </CardContent>
      <CardActions>
        <IconButton>
          <ThumbUp />
        </IconButton>
        <IconButton>
          <Comment />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Theme,
} from "@mui/material";
import { FeedService } from "../../services/FeedService";
import { Comment, Share, ThumbUp } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#efefef',
    minHeight: '100%',
    margin: 'auto',
    [theme.breakpoints.up("md")]: {
      maxWidth: "500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    [theme.breakpoints.down("md")]: {
      padding: "16px",
    }
  },
  cardContainer: {
    padding: "8px 4px",
    width: '100%',
  },
}));

export const HomePage = () => {
  const [posts, setPosts] = React.useState<any>(undefined);
  const classes = useStyles();
  const loadPosts = async () => {
    const data = await FeedService.getFeed();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={classes.root}>
      {posts &&
        posts?.map((post: any, index: number) => {
          return (
            <div key={index} className={classes.cardContainer}>
              <PostCard post={post} />
            </div>
          );
        })}
      {!posts && <h1>Loading...</h1>}
    </div>
  );
};

interface PostCardProps {
  post: {
    id: number;
    message: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      avatar: string;
    };
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
      />
      <CardContent>{post.message}</CardContent>
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

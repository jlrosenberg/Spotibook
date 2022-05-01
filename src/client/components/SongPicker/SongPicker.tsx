import { Autocomplete, TextField, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { SearchService } from "../../services/SearchService";

interface Props {
  onSongSelected: (song: any) => void;
  filterExplicit: boolean;
  placeholder?: string;
  width?: string;
}

export const SongPicker: React.FC<Props> = ({
  onSongSelected,
  filterExplicit,
  placeholder = "Start typing song name here",
  width = "100%",
}) => {
  const [songs, setSongs] = useState<Array<any>>([]);
  const searchForSongs = async (term: string) => {
    const newSongs = await SearchService.searchForSongs(term);
    // console.log(newSongs);
    if (filterExplicit) {
      setSongs(newSongs.filter((song) => !song.explicit));
    } else {
      setSongs(newSongs);
    }
  };

  return (
    <Autocomplete
      autoComplete
      options={songs}
      onChange={(_event: any, newValue: any) => {
        onSongSelected(newValue);
        console.log("onChangeFired");
        console.log("new value is", newValue);
      }}
      onInputChange={(_event: any, newInputValue: string) => {
        console.log("ON INPUT CHANGE");
        searchForSongs(newInputValue);
      }}
      renderInput={(params) => (
        <div style={{ width: width}}>
          <TextField {...params} placeholder={placeholder} fullWidth sx={{}} />
        </div>
      )}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option: any) => (
        <SongOption notsure={props} song={option} />
      )}
    />
  );
};

const useOptionStyles = makeStyles({
  container: {
    height: "54px",
    marginBottom: "4px",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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

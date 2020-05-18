import React, { useState } from "react";
import {
  makeStyles,
  IconButton,
  Paper,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SearchSpotify } from "../../SpotifyConnection/SpotifyConnection";

const enterCharCode = 13;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "95%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchBar = ({ setSearchResults }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const submit = async () => {
    console.log("searching for: ", query);
    let results = await SearchSpotify(query);
    setSearchResults(results);
  };

  const searchBarEnter = (evt) => {
    if (evt.charCode == enterCharCode) {
      submit();
    }
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        autoFocus
        className={classes.input}
        placeholder="Search for a Song/Artist/Album"
        inputProps={{ "aria-label": "search for a Song, Artist or album" }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => searchBarEnter(e)}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => submit()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export { SearchBar };

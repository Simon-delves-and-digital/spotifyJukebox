import React, { useState } from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
  Paper,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { AddSong } from "../../SpotifyConnection/SpotifyConnection";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ResultsPage = ({ searchResults }) => {
  const classes = useStyles();
  const [addedSongs, setAddedSongs] = useState({});

  const addSong = (uri) => {
    AddSong(uri);
    let newSongs = { ...addedSongs, [uri]: true };
    setAddedSongs(newSongs);
  };

  const mapSongs = (searchResults) => {
    if (!searchResults || !searchResults.tracks) return;

    let songs = searchResults.tracks.items;

    return (
      <TableBody>
        {songs.map((song) => {
          if (!song || !song.artists || !song.album) return;

          let artistNames = song.artists.reduce((accumulator, artist) => {
            accumulator.push(artist.name);
            return accumulator;
          }, []);

          return (
            <TableRow key={song.id}>
              <TableCell component="th" scope="row">
                {
                  <IconButton
                    disabled={addedSongs[song.uri]}
                    onClick={() => {
                      addSong(song.uri);
                    }}
                  >
                    {addedSongs[song.uri] ? <CheckCircleIcon /> : <AddIcon />}
                  </IconButton>
                }
              </TableCell>
              <TableCell >
                {song.name}
              </TableCell>
              <TableCell>{artistNames && artistNames.join(", ")}</TableCell>
              <TableCell>{song.album.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  if (searchResults) {
    if (searchResults.error) {
      return (
        <>
          {searchResults.error.message
            ? searchResults.error.message
            : "unknown error fetching data"}
        </>
      );
    } else {
      return (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Queue</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
              </TableRow>
            </TableHead>
            {mapSongs(searchResults)}
          </Table>
        </TableContainer>
      );
    }
  } else {
    return <Typography> Search for a song :D </Typography>;
  }
};

export { ResultsPage };

import { generateRandomString } from "./utils/utils.js";

import express from "express";
import cors from "cors";
import querystring from "querystring";
import cookieParser from "cookie-parser";
import request from "request";
import path from "path";

const app = express();
app.use(cors());
const PORT = 4000;

const client_id = "39588c28bc2c44438903f25f90e7bc0d"; // Your client id
const client_secret = "a1e04d2cd7df47ef880eee06bad7b8fe"; // Your secret
const redirect_uri = `http://localhost:${PORT}/callback`; // Your redirect uri
const scope = "user-modify-playback-state";
const stateKey = "spotify_auth_state";

var accessToken, refreshToken;

app
  .use(express.static(path.resolve("./public")))
  .use(cors())
  .use(cookieParser());

app.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);

    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        accessToken = body.access_token;
        refreshToken = body.refresh_token;
      }
    });
    res.redirect("/");
  }
});

app.get("/refreshToken", (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

app.get("/search", function (req, res) {
  let searchTerm = req.query.query;

  var options = {
    url: "https://api.spotify.com/v1/search",
    headers: { Authorization: "Bearer " + accessToken },
    qs: { q: searchTerm, type: "album,artist,track" },
    q: searchTerm,
    json: true,
  };

  request.get(options, function (error, response, body) {
    res.send(body);
  });
});

app.post("/addSong", function (req, res) {
  let uri = req.query.uri;

  var options = {
    url: "https://api.spotify.com/v1/me/player/queue",
    headers: { Authorization: "Bearer " + accessToken },
    qs: { uri: uri },
    json: true,
  };

  // use the access token to access the Spotify Web API
  request.post(options, function (error, response, body) {
    res.send(response);
  });
});

app.listen(PORT, () => {
  console.log(`now listening on ${PORT}`);
});

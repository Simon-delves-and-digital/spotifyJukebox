import React from "react";
import { Paper, Link, Button } from "@material-ui/core";
// import { SpotifyLogin } from "../../SpotifyConnection/SpotifyConnection";

const Login = () => {
  return (
    <Paper>
      <Button>
        <Link href="http://localhost:4000/login">login</Link>
      </Button>
    </Paper>
  );
}

export { Login };
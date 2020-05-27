import React, { useState } from "react";
import { ResultsPage } from "./components/ResultsPage/ResultsPage";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { IsLoggedIn } from "./SpotifyConnection/SpotifyConnection";
import { Login } from "./components/Login/Login";

const App = () => {
  const [searchResults, setSearchResults] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    let status = await IsLoggedIn();
    console.log(status);
    setIsLoggedIn(status ? status : false);
  };
  checkLoginStatus();

  if (isLoggedIn) {
    return (
      <>
        <SearchBar setSearchResults={setSearchResults} />
        <ResultsPage searchResults={searchResults} />
      </>
    );
  } else {
    return <Login />;
  }
};

export default App;

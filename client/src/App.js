import React, { useState } from "react";
import { ResultsPage } from "./components/ResultsPage/ResultsPage";
import { SearchBar } from "./components/SearchBar/SearchBar";

const App = () => {
  const [searchResults, setSearchResults] = useState();

  return (
    <>
      <SearchBar setSearchResults={setSearchResults} />
      <ResultsPage searchResults={searchResults} />
    </>
  );
}

export default App;

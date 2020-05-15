import React, { useState } from "react";

const ResultsPage = ({ searchResults }) => {
    if (searchResults) {
        // return <>  RESULTS </> 
        return <pre>{JSON.stringify(searchResults)}</pre>;
    }
    else {
        return <> NO RESULTS </> 
    }


  return <>HI</>;
}

export { ResultsPage };
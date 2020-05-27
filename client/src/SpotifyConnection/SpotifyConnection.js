const baseUrl = "http://localhost:4000/";
const searchEndpoint = "search";
const searchQueryParam = "query";
const addSongEndpoint = "addSong";
const addSongQueryParam = "uri";
const isLoggedInEndpoint = "isLoggedIn";

export const SearchSpotify = async (query) => {
  let apiUrl = `${baseUrl}${searchEndpoint}?${searchQueryParam}=${query}`;
  try {
    const result = await fetch(apiUrl);

    return await result.json();
  } catch (error) {
    console.log("error fetching form server");
  }
};

export const AddSong = async (uri) => {
  let apiUrl = `${baseUrl}${addSongEndpoint}?${addSongQueryParam}=${uri}`;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
    });

    return await result.json();
  } catch (error) {
    console.log("error adding song: ", error);
  }
};

export const IsLoggedIn = async () => {
  let apiUrl = `${baseUrl}${isLoggedInEndpoint}`;

  try {
    const result = await fetch(apiUrl, { json: true });

    let json = await result.json();

    return json ? json.isLoggedIn : false;
  } catch (error) {
    console.log("error checking if logged in: ", error);
  }
};

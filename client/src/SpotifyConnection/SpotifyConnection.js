const baseUrl = "http://localhost:4000/";
const searchEndpoint = "search";
const searchQueryParam = "query";

export const SearchSpotify = async (query) => {
  let apiUrl = `${baseUrl}${searchEndpoint}?${searchQueryParam}=${query}`;
  try {
    const result = await fetch(apiUrl);

    return await result.json();
  } catch (error) {
    console.log("error fetching form server");
  }
};

// "use strict";
import { getArtistData } from "./rest-service.js";
import { artists, showArtists } from "./script.js";

function sortByChanged(event) {
  const selectedValue = event.target.value;
  if (selectedValue === "name") {
    artists.sort(compareName);
  } else if (selectedValue === "genres") {
    artists.sort(compareGenres);
  }
  showArtists(artists);
}

function compareName(artist1, artist2) {
  return artist1.name.localeCompare(artist2.name);
}

function compareGenres(artist1, artist2) {
  return artist1.genres.localeCompare(artist2.genres);
}

async function filterChanged() {
  const filterField = document.querySelector("#filter-by").value;
  const artists = await getArtistData();
  if (filterField === "show-all") {
    showArtists(artists);
  } else {
    const filteredArtists = artists.filter((artist) => artist.favorite === true);
    showArtists(filteredArtists);
  }
}

export { filterChanged, sortByChanged };

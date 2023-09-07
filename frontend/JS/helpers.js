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

export { sortByChanged };

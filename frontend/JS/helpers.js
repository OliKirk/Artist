// "use strict";
import { artists, showArtists } from "./script.js";

// function searchArtists(searchValue) {
//   searchValue = searchValue.toLowerCase();
//   const results = artists.filter(checkTitle);
//   function checkTitle(artist) {
//     const name = artist.name.toLowerCase();
//     return name.includes(searchValue);
//   }
//   return results;
// }

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

function filterByGenre(inputValue) {
  inputValue = inputValue.toLowerCase();
  if (inputValue !== "") {
    let filteredList = artists.filter((artist) => artist.genres.toLowerCase().includes(inputValue));
    return filteredList;
  }
}

export { filterByGenre, sortByChanged };

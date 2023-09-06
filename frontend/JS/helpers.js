// "use strict";
// import { artists, showArtists, updateArtistsGrid } from "./script.js";

// function searchArtists(searchValue) {
//   searchValue = searchValue.toLowerCase();
//   const results = artists.filter(checkTitle);
//   function checkTitle(artist) {
//     const name = artist.name.toLowerCase();
//     return name.includes(searchValue);
//   }
//   return results;
// }

// function sortByChanged(event) {
//   const selectedValue = event.target.value;
//   if (selectedValue === "name") {
//     artists.sort(compareName);
//   } else if (selectedValue === "genre") {
//     artists.sort(compareGenre);
//   }
//   showArtists(artists);
// }
// //
// function compareName(artist1, artist2) {
//   return artist1.name.localeCompare(artist2.name);
// }

// function compareGenre(artist1, artist2) {
//   return artist1.genre.localeCompare(artist2.genre);
// }

// function filterByGenre(inputValue) {
//   inputValue = inputValue.toLowerCase();
//   if (inputValue !== "") {
//     let filteredList = artists.filter((artist) => artist.genre.toLowerCase().includes(inputValue));
//     return filteredList;
//   }
// }

// export { prepareArtists, searchArtists, sortByChanged, filterByGenre };

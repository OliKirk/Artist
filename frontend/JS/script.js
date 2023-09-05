"use strict";

window.addEventListener("load", initApp);

const endpoint = "www.localhost://3000";

function initApp() {
  console.log("initApp is running");
}

function showArtistsGrid(listOfArtists) {
  document.querySelector("#artist-data").innerHTML = "";
  for (const artist of listOfArtists) {
    showArtist(artist);
  }
}

function showArtist(artist) {
  const artistHTML = /*html*/ `
    <article class="grid-item">
    <div class="body">
    <img src=${artist.image}>
    <h2>${artist.name}</h2>
    <h2>${artist.genres}</h2>
    `;
}

function openArtistDialog() {}

function closeArtistDialog() {}

function updateClicked() {}

function deleteClicked() {}

function showCreateArtistDialog() {}

function deleteCancelClicked() {}

function createCancelClicked() {}

function filterCancelClicked(params) {}

function filterArtistClicked(params) {}

function createArtistClicked(params) {}

function deleteArtistClicked(params) {}

function inputSearchChanged(params) {}

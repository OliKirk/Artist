"use strict";

import { getArtistData, deleteArtist, updateArtist, createArtist } from "./rest-service";
import { searchArtist, sortByChanged, filterByGenre } from "./helpers.js";

window.addEventListener("load", initApp);

const endpoint = "www.localhost://3000";

let artists;

function initApp() {
  console.log("initApp is running");
  document.querySelector("#create-artist-btn").addEventListener("click", showCreateArtistDialog);
  document.querySelector("#form-create-artist").addEventListener("submit", createArtistClicked);
  document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);
  document.querySelector("#filter-btn").addEventListener("click", filterArtistsClicked);
  document.querySelector("#form-create-artist .btn-cancel").addEventListener("click", createCancelClicked);
  document.querySelector("#form-delete-artist .btn-cancel").addEventListener("click", deleteCancelClicked);
  document.querySelector("#dialog-update-close-btn").addEventListener("click", updateCancelClicked);
  document.querySelector("#filter-btn-close").addEventListener("click", filterCancelClicked);
  document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);
  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
  document.querySelector("#filter-by").addEventListener("change", (event) => showArtists(filterByGenre(event.target.value)));
}

async function updateArtistGrid() {
  artists = await getArtistData();
  showArtists(artists);
}

function showArtists(listOfArtists) {
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
    </div>
    <div class="btns">
    <button class="update-btn">Update</button>
    <button class="delete-btn">Delete</button>
    </div>
    </article>`;
  document.querySelector("#artist-data").insertAdjacentHTML("beforeend", artistHTML);

  document.querySelector("#artist-data article:last-child .delete-btn").addEventListener("click", deleteClicked);
  document.querySelector("#artist-data article:last-child .update-btn").addEventListener("click", updateClicked);
  document.querySelector("#artist-data article:last-child .body").addEventListener("click", openArtistDialog);

  function openArtistDialog() {
    console.log("Open dialog / detail  view");
    const myHTML = /*HTML*/ `<article id="artistinfo">
    <h2>Name: ${artist.name}</h2>
    <img class="artistinfo-img" src=${artist.image}>
    <p>Birthday: ${artist.birthday}</p>;
    <p>Genres: ${artist.genres}</p>;
    <p>Labels: ${artist.labels}</p>;
    <p>Website: ${artist.website}</p>;
    <p>shortDescription: ${artist.shotDescription}</p>`;
    document.querySelector("#dialog-detail-view").insertAdjacentHTML("beforeend", myHTML);
    document.querySelector("#dialog-detail-view").showModal();

    document.querySelector("#close-btn").addEventListener("click", closeDialog);
  }

  function closeDialog() {
    console.log(closeDialog);
    document.querySelector("#dialog-detail-view").closest();
    document.querySelector("#artistinfo").remove();
  }
}

function updateClicked() {
  const updateForm = document.querySelector("#form-update-artist");
  updateForm.name.value = artist.name;
  updateForm.birthday.value = artist.birthday;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.website.value = artist.website;
  updateForm.image.value = artist.image;
  updateForm.shotDescription.value = artist.shotDescription;
  document.querySelector("#dialog-update-artist").showModal;
}

function deleteClicked() {
  document.querySelector("#dialog-delete-artist-name").textContent = artist.name;
  document.querySelector("#form-delete-artist").setAttribute("data-id", artist.id);
  document.querySelector("#dialog-delete-artist").showModal();
}

function updateArtistClicked(event) {
  const form = event.target;
  const name = form.name.value;
  const birthday = form.birthday.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const id = form.getAttribute("data-id");
  updateArtistClicked(id, name, birthday, genres, labels, website, image, shortDescription);
}

function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-artist").close();
}

function createCancelClicked() {
  document.querySelector("#dialog-create-artist").close();
}

function filterCancelClicked() {
  document.querySelector("#filter-dialog").close();
}

function filterArtistClicked() {
  document.querySelector("#filter-dialog").showModal();
}

async function createArtistClicked(event) {
  const form = event.target;
  const name = form.name.value;
  const birthday = form.birthday.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const res = await createArtistClicked(name, birthday, genres, labels, website, image, shortDescription);
  if (res.ok) {
    updateArtistClicked();
    form.reset();
  }
}

function deleteArtistClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteArtist(id);
}

function inputSearchChanged(event) {
  const value = event.target.value;
  const artistsShow = searchArtist(value);
  showArtist(artistsShow);
}

export { updateArtistGrid, artists, showArtists };

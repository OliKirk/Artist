import { getArtistData, deleteArtist, createArtist, updateArtist } from "./rest-service.js";

window.addEventListener("load", initApp);

let artists;

function initApp() {
  console.log("initApp is running");
  updateArtistGrid();

  document.querySelector("#create-artist-btn").addEventListener("click", showArtistDialog);
  document.querySelector("#form-create-artists .btn-cancel").addEventListener("click", createCancelClicked);
  document.querySelector("#form-create-artists").addEventListener("submit", createArtistClicked);

  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);
  // document.querySelector("#form-update-artist .btn-cancel").addEventListener("click", updateCancelClicked);

  document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  document.querySelector("#form-delete-artist .btn-cancel").addEventListener("click", deleteCancelClicked);
}

async function updateArtistGrid() {
  artists = await getArtistData();
  showArtists(artists);
}

function showArtists(listOfArtists) {
  document.querySelector("#artist-grid").innerHTML = "";
  for (const artist of listOfArtists) {
    document.querySelector("#artist-grid").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
    <article class="artistArticle">
    <img src=${artist.image}>
    <h2>${artist.name}</h2>
    <h2>${artist.shortDescription}</h2>

    <div class="btns">
    <button class="delete-artist-btn">Delete</button>
    <button class="update-artist-btn">Update</button>
    </div>
    </article>`
    );
    document.querySelector("#artist-grid article:last-child .delete-artist-btn").addEventListener("click", () => deleteClicked(artist));
    document.querySelector("#artits-grid article:last-child .update-artist-btn").addEventListener("click", () => updateClicked(artist));
    // document.querySelector("#artist-grid article:last-child .dialog-detail-view").addEventListener("click", openArtistDialog);
  }

  function openArtistDialog() {
    const artistHTML = /*HTML*/ `
      <article id="artistinfo">
      <h2>${artist.name}</h2>
      <img class="artistinfo-img" src=${artist.image}>
        <p>${artist.genres}</p>
        <p>${artist.birthdate}</p>
        <p>${artist.activeSince}</p>
        <p>${artist.labels}</p>
        <p>${artist.website}</p>
        <button id="close-btn">Close</button>
      </article>`;
    document.querySelector("#dialog-detail-view").insertAdjacentHTML("beforeend", artistHTML);
    document.querySelector("#dialog-detail-view").showModal();

    document.querySelector("#close-btn").addEventListener("click", closeDialog);
  }

  function closeDialog() {
    document.querySelector("#dialog-detail-view").close();
    document.querySelector("#artistinfo").remove();
  }
}

async function createArtistClicked(event) {
  console.log("create virker");
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const activeSince = form.activeSince.value;
  const fav = form.fav.value;

  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription, fav);
  if (res.ok) {
    updateArtistGrid();
    form.reset();
  }
}

function updateClicked(artist) {
  const updateForm = document.querySelector("#form-update-artist");
  updateForm.name.value = artist.name;
  updateForm.birthdate.value = artist.birthdate;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.website.value = artist.website;
  updateForm.image.value = artist.image;
  updateForm.shortDescription.value = artist.shortDescription;
  updateForm.fav.value = artist.fav;
  updateForm.setAttribute("data-id", artist);
  document.querySelector("#dialog-update-artist").showModal();
}

async function updateArtistClicked(event) {
  console.log("update virker");
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const image = form.image.value;
  const shortDescription = form.shortDescription.value;
  const activeSince = form.activeSince.value;
  const fav = form.fav.value;
  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription, fav);
  if (res.ok) {
    updateArtistGrid();
    form.reset();
  }
}

function deleteClicked(artist) {
  document.querySelector("#dialog-delete-artist-name").textContent = artist.name;
  document.querySelector("#form-delete-artist").setAttribute("data-id", artist.id);
  document.querySelector("#dialog-delete-artist").showModal();
}

async function deleteArtistClicked(event) {
  const id = event.target.getAttribute("data-id");
  console.log(id);
  const res = await deleteArtist(id);

  if (res.ok) {
    updateArtistGrid();
  }
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-artist").close();
}

function updateCancelClicked() {
  document.querySelector("#dialog-update-artist").close();
}

function showArtistDialog() {
  document.querySelector("#dialog-create-artists").showModal();
}

function createCancelClicked() {
  document.querySelector("#dialog-create-artists").close();
}

export { updateArtistGrid };

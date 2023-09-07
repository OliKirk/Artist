import { getArtistData, deleteArtist, createArtist, changeFav, updateArtist } from "./rest-service.js";
import { sortByChanged } from "./helpers.js";
window.addEventListener("load", initApp);

let artists;

function initApp() {
  console.log("initApp is running");
  updateArtistGrid();
  // <====================== Create artist ======================>
  document.querySelector("#create-artist-btn").addEventListener("click", showArtistDialog);
  document.querySelector("#form-create-artists .btn-cancel").addEventListener("click", createCancelClicked);
  document.querySelector("#form-create-artists").addEventListener("submit", createArtistClicked);

  // <====================== Update artist ======================>
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);
  document.querySelector("#form-update-artist .btn-cancel").addEventListener("click", updateCancelClicked);
  // <====================== Delete artist ======================>
  document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  document.querySelector("#form-delete-artist .btn-cancel").addEventListener("click", deleteCancelClicked);

  // <====================== Filter & Sort artist ======================>
  document.querySelector("#select-filter-by").addEventListener("change", filterChanged);
  document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);
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
    <p>${artist.shortDescription}</p>
    <p>${artist.birthdate}</p>
    <p>${artist.website}</p>
    <p>${artist.genres}</p>
    <p>${artist.labels}</p>
    <p>${artist.shortDescription}</p>
    
    <div class="btns">
    <button class="fav-artist-btn">Add artist to favorite</button>
    <button class="delete-artist-btn">Delete</button>
    <button class="update-artist-btn">Update</button>
    </div>
    </article>`
    );
    document.querySelector("#artist-grid article:last-child .delete-artist-btn").addEventListener("click", () => deleteClicked(artist));
    document.querySelector("#artist-grid article:last-child .update-artist-btn").addEventListener("click", () => updateClicked(artist));
    document.querySelector("#artist-grid article:last-child .fav-artist-btn").addEventListener("click", () => changeFavClicked(artist));
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
  // const fav = form.fav.value;

  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (res.ok) {
    updateArtistGrid();
    form.reset();
  }
}

function updateClicked(artist) {
  console.log(artist);
  const updateForm = document.querySelector("#form-update-artist");
  updateForm.name.value = artist.name;
  updateForm.birthdate.value = artist.birthdate;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.website.value = artist.website;
  updateForm.image.value = artist.image;
  updateForm.shortDescription.value = artist.shortDescription;
  // updateForm.fav.value = artist.fav;
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
  // const fav = form.fav.value;
  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (res.ok) {
    updateArtistGrid();
    form.reset();
  }
}

async function favArtist(req, res) {
  const id = Number(req.params.id);
  const artists = await readArtists();
  const artistToUpdate = artists.find((artist) => artist.id === id);
  if (!artistToUpdate) {
    res.status(404).json({ error: "Artist not found" });
  } else {
    artistToUpdate.favorite = !artistToUpdate.favorite;
    fs.writeFile("data.json", JSON.stringify(artists));
    res.json(artists);
  }
}

async function changeFavClicked(artist) {
  const res = await changeFav(artist);
  if (res.ok) {
    updateArtistGrid();
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

async function filterChanged() {
  const filterField = document.querySelector("#select-filter-by").value;
  const artists = await getArtistData();
  if (filterField === "show-all") {
    showArtists(artists);
  } else {
    const filteredArtists = artists.filter((artist) => artist.fav === true);
    showArtists(filteredArtists);
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

function filterArtistsClicked() {
  document.querySelector("#filter-dialog").showModal();
}

export { updateArtistGrid, artists, showArtists };

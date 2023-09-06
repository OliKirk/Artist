import { getArtistData, deleteArtis, createArtist, updateArtist } from "./rest-service.js";

window.addEventListener("load", initApp);

// let artists;

function initApp() {
  console.log("initApp is running");
  updateArtistGrid();

  document.querySelector("#create-artist-btn").addEventListener("click", showArtistDialog);
  document.querySelector("#form-create-artists").addEventListener("submit", createArtistClicked);
  document.querySelector("#create-champ-cancel .btn-cancel").addEventListener("click", createCancelClicked);
  document.querySelector("#update-artist").addEventListener("submit", updateArtistClicked);
  document.querySelector("#delete-artist").addEventListener("submit", deleteArtistClicked);
}

async function updateArtistGrid() {
  const artists = await getArtistData();
  showArtists(artists);
}

function showArtists(listOfArtists) {
  document.querySelector("#artist-grid").innerHTML = "";
  for (const artist of listOfArtists) {
    document.querySelector("#artist-grid").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
    <article>
    <img src=${artist.image}>
    <h2>${artist.name}</h2>
    <h2>${artist.shortDescription}</h2>
    <div class="btn">
    <button id="delete-artist-btn" class="delete-artist">Delete</button>
    <button id="update-artist-btn" class="update-artist">Update</button>
    </div>
    </article>`
    );
    // document.querySelector("#artits article:last-child .delete-artist").addEventListener("click", deleteClicked);
    // document.querySelector("#artits article:last-child .update-artist").addEventListener("click", updateClicked);
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
  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (res.ok) {
    updateArtistGrid();
    form.reset();
  }
}

function deleteArtistClicked(event) {
  const id = event.taarget.getAtribute("data-id");
  deleteArtis(id);
}

// function updateArtistClicked() {}

function showArtistDialog() {
  document.querySelector("#dialog-create-artists").showModal();
}

export { updateArtistGrid };

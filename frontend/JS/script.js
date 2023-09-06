import { getArtistData, deleteArtists, createArtist, updateArtist } from "./rest-service.js";

window.addEventListener("load", initApp);

let artists;

function initApp() {
  console.log("initApp is running");
  updateArtistGrid();

  document.querySelector("#create-artist-btn").addEventListener("click", showArtistDialog);
  document.querySelector("#form-create-artists .btn-cancel").addEventListener("click", createCancelClicked);
  document.querySelector("#form-create-artists").addEventListener("submit", createArtistClicked);
  // document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  // document.querySelector("#form-delete-artist btn-cancel").addEventListener("click", deleteCancelClicked);

  // document.querySelector("#update-artist").addEventListener("submit", updateArtistClicked);
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
    <article>
    <img src=${artist.image}>
    <h2>${artist.name}</h2>
    <h2>${artist.shortDescription}</h2>
    <div class="btns">
    <button id="delete-artist-btn" class="delete-artist-btn">Delete</button>
    <button id="update-artist-btn" class="update-artist">Update</button>
    </div>
    </article>`
    );
    // document.querySelector("#artits-grid article:last-child .delete-artist-btn").addEventListener("click", deleteArtistClicked);
    // document.querySelector("#artits-grid article:last-child .update-artist-btn").addEventListener("click", updateArtistClicked);
    document.querySelector("#artist-grid article:last-child .body").addEventListener("click", openArtistDialog);

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
  const res = await createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription);
  if (res.ok) {
    updateArtistGrid();
    form.reset();
  }
}

// function deleteArtistClicked(event) {
//   const id = event.taarget.getAtribute("artist-data");
//   deleteArtis(id);
// }

// function deleteCancelClicked() {
//   document.querySelector("#dialog-delete-artist").close();
// }

// function updateArtistClicked() {}

function showArtistDialog() {
  document.querySelector("#dialog-create-artists").showModal();
}

function createCancelClicked() {
  document.querySelector("#dialog-create-artists").close();
}

export { updateArtistGrid };

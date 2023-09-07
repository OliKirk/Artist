import { updateArtistGrid } from "./script.js";
const endpoint = "http://localhost:3000";

async function getArtistData() {
  const res = await fetch(`${endpoint}/artists`);
  const data = await res.json();
  return data;
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
  console.log("VI VIRKER");
  const newArtist = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistJson = JSON.stringify(newArtist);
  const res = await fetch(`${endpoint}/artists`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: artistJson,
  });
  return res;
}

async function deleteArtist(id) {
  const res = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  return res;
}

async function updateArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
  const artistToUpdate = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistJson = JSON.stringify(artistToUpdate);
  const res = await fetch(`${endpoint}/artists`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: artistJson,
  });
  if (res.ok) {
    updateArtistGrid();
  }
}

export { getArtistData, deleteArtist, createArtist, updateArtist };

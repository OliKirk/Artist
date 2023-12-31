import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on www.https://localhost:${port}`);
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);

  res.json(artists);
});

app.get("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);

  let artist = artists.find((artist) => artist.id === id);

  fs.writeFile("backend/data.json", JSON.stringify(artists));

  if (!artist) {
    res.status(404).json({ error: "Artist not found" });
  } else {
    res.json(artist);
  }
});

app.post("/artists", async (req, res) => {
  const newArtist = req.body;
  newArtist.id = new Date().getTime();

  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  fs.writeFile("backend/data.json", JSON.stringify(artists));
  res.json(artists);
});

app.put("/artists/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);
  let artistToUpdate = artists.find((artist) => artist.id == id);
  console.log(artistToUpdate);
  const body = req.body;

  console.log(body);
  artistToUpdate.name = body.name;
  artistToUpdate.birthday = body.birthday;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;

  fs.writeFile("backend/data.json", JSON.stringify(artists));
  res.json(artists);
});

app.delete("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const newArtists = artists.filter((artist) => artist.id !== id);
  fs.writeFile("backend/data.json", JSON.stringify(newArtists));

  res.json(artists);
});

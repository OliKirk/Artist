import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on www.https://localhost:${port}`);
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);

  res.send(artists);
});

app.get("/artists/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);

  let artist = artists.find((artist) => artist.id === id);

  if (!artist) {
    res.status(404).json({ error: "Artist not found" });
  } else {
    res.json(artist);
  }
});

app.post("/artists", async (req, res) => {
  const newArtist = req.body;
  newArtist.id = new Date().getTime();
  // const newArtist = {
  //   id: new Date().getTime(),
  //   // name: req.name.artist,
  //   // birthday: req.birthday.artist,
  //   // genres: req.genres.artist,
  //   // labels: req.labels.artist,
  //   // website: req.website.artist,
  //   // image: req.image.artist,
  //   // shortDescription: req.shortDescription.artist,
  // };

  const data = await fs.readFile("backend/data.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  fs.writeFile("backend/data.json", JSON.stringify(artists));
  res.json(artists);
});

app.put("/artists/:id", (req, res) => {
  res.json(req.parameter);
});

app.delete("/artists/:id", (req, res) => {
  res.send("Got a DELETE request");
});

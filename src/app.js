const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const idx = repositories.findIndex((repo) => repo.id === id);

  if (idx < 0) {
    return response.status(400).json("Not Found Repository");
  }

  const copy = repositories[idx];
  repositories[idx] = { ...copy, id, title, url, techs };

  return response.json(repositories[idx]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const idx = repositories.findIndex((repo) => repo.id === id);

  if (idx < 0) {
    return response.status(400).json("Not Found Repository");
  }

  repositories.splice(idx, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const idx = repositories.findIndex((repo) => repo.id === id);

  if (idx < 0) {
    return response.status(400).json("Not Found Repository");
  }

  const copy = repositories[idx];
  repositories[idx] = { ...copy, likes: copy.likes + 1 };

  return response.json(repositories[idx]);
});

module.exports = app;

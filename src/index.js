const { response, json } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
// const {uuid, isUuid } = require("uuidv4");
const { validate: uuidValidate } = require("uuid");

const app = express();
app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.log("PASSO 1");
  console.time(logLabel);

  next();

  console.log("PASSO 2");
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!uuidValidate(id)) {
    return response.status(400).json({ error: "Invalid Project ID" });
  }

  return next();
}

app.use(logRequests);

app.get("/projects", validateProjectId, (request, response) => {
  console.log("PASSO 3");
  const { title } = request.query;
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(projects);
});

app.post("/projects", validateProjectId, (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuidv4(), title, owner };
  console.log(project);
  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", validateProjectId, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project Not Found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", validateProjectId, (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project Not Found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3000, () => {
  console.log("🔶BACK-END STARTED");
});

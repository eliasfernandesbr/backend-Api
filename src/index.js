const { response, json } = require("express");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
uuidv4();

const app = express();
app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
    

  return response.json(projects);
});

app.post("/projects", (request, response) => {
    const {title, owner}= request.body;
    
    const project = { id: uuidv4(), title, owner};
    projects.push(project)

  return response.json(project)
});

app.put("/projects/:id", (request, response) => {
    const params = request.params;
    console.log(params);


    return response.json([
        "Projeto 4",
        "Projeto 2",
        "Projeto 3"
    ]);
  });

  app.delete("/projects/:id", (request, response) => {
    return response.json([
        "Projeto 2",
        "Projeto 3"
    ]);
  });

app.listen(3000, () => {
  console.log("🔶BACK-END STARTED");
});

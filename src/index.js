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
    const {title, owner} = request.body;
    
    const project = { id: uuidv4(), title, owner};
    projects.push(project)

  return response.json(project)
});

app.put("/projects/:id", (request, response) => {
    const {id} = request.params;
    const { title, owner} = request.body;
    
    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
      return response.status(400).json({error: "Project Not Found"})
    }

    const project  = {
      id,
      title,
      owner,
    };

    projects[projectIndex] =  project;


    return response.json(project)
  });

  app.delete("/projects/:id", (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
      return response.status(400).json({error: "Project Not Found"})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
  });

app.listen(3000, () => {
  console.log("🔶BACK-END STARTED");
});

const { response, json } = require("express");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/projects", (request, response) => {
    const query = request.query;

    console.log(query);

  return response.json([
        "Projeto 1",
        "Projeto 2"
    ]);
});

app.post("/projects", (request, response) => {
    const body = request.body;
    console.log(body);

  return response.json([
        "Projeto 1",
        "Projeto 2", 
        "Projeto 3"
    ]);
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

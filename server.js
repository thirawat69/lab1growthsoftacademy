const express = require("express");
const app = express();

const foods = require("./db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/foods", (req, res) => {
  res.json(foods);
});

app.get("/foods/:id", (req, res) => {
  res.json(foods.find(food => food.id === req.params.id));
});

app.post("/foods", (req, res) => {
  foods.push(req.body);
  res.status(201).json(req.body);
});

app.put("/foods/:id", (req, res) => {
  const updateIndex = foods.findIndex(food => food.id === req.params.id);
  res.json(Object.assign(foods[updateIndex], req.body));
});

app.delete("/foods/:id", (req, res) => {
  const deletedIndex = foods.findIndex(food => food.id === req.params.id);
  foods.splice(deletedIndex, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});

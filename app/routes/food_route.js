var express = require("express");
var router = express.Router();
let Food = require("../models/food_model.js");

router.post("/food/", function(request, response) {
  console.log(request.body);

  let food = new Food();
  console.log(food);
  food.name = request.body.foodName;

  console.log(parseFloat(request.body.calory));

  if (isNaN(parseFloat(request.body.calory)))
    response.status(500).send({ message: "calory is not a number" });
  else {
    food.calory = request.body.calory;
    food.save(function(err, mgResponse) {
      if (err) response.status(500).send({ message: err });
      else {
        console.log("SAVE COMPLETE");
        // console.log(response);
        response.send(mgResponse);
      }
    });
  }
});

router.get("/food/", function(request, response) {
  console.log("REQUEST GET!!");
  console.log(request.params.id);
  let data = null;
  Food.find(function(err, mgResponse) {
    response.send(mgResponse);
  });
});

router.get("/food/:id", function(request, response) {
  console.log("REQUEST GET!!");
  console.log(request.params.id);
  let data = null;
  findFoodById(request.params.id, function(err, mgResponse) {
    if (mgResponse == undefined)
      response
        .status(404)
        .send({ message: `id ${request.params.id} not found` });
    else response.send(mgResponse);
  });
});

module.exports = router;

function findFoodById(id, callback) {
  Food.findById(id, function(err, mgResponse) {
    console.log("GET COMPLETE");
    console.log(mgResponse);
    callback(err, mgResponse);

    // console.log(mgResponse[0].name);
  });
}

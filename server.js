const express = require("express");
const app = express();

const foods = require("./db");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config/config.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

var sessionStore = new MongoDBStore({
  uri: config.dbUrl,
  collection: "sessionStore"
});

const mongooseOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
mongoose.connect(config.dbUrl, mongooseOption, function(err) {
  if (err) {
    console.log(
      "********************************!!! WARNING plzzz !!!*********************************"
    );
    console.log(
      "                          Can't connect to Database. naka e dok"
    );
    console.log(
      "             Please Start database first than restarting this server."
    );
    console.log(
      "**************************************************************************************"
    );

    console.log(err);
  } else {
    console.log(
      "======================== DB is CONNECTED ========================="
    );
  }
});

app.use(
  bodyParser.json({
    limit: "1000mb",
    parameterLimit: 300000
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "1000mb",
    extended: true,
    parameterLimit: 300000
  })
);

// ROUTES FOR OUR API
// =============================================================================
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//partial API
// app.use("", require("./app/route/testAPI.js"));
app.use("/api", require("./app/routes/food_route.js"));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/foods", (req, res) => {
//   res.json(foods);
// });

// app.get("/foods/:id", (req, res) => {
//   res.json(foods.find(food => food.id === req.params.id));
// });

// app.post("/foods", (req, res) => {
//   foods.push(req.body);
//   res.status(201).json(req.body);
// });

// app.put("/foods/:id", (req, res) => {
//   const updateIndex = foods.findIndex(food => food.id === req.params.id);
//   res.json(Object.assign(foods[updateIndex], req.body));
// });

// app.delete("/foods/:id", (req, res) => {
//   const deletedIndex = foods.findIndex(food => food.id === req.params.id);
//   foods.splice(deletedIndex, 1);
//   res.status(204).send();
// });

// START THE SERVER
// =============================================================================
var http = require("http");
var port = process.env.PORT || config.httpport;
var httpServer = http.createServer(app);

// var https = require('https');
// var httpsPort = process.env.PORT || 8084;
// var httpsServer = https.createServer({
//     key: fs.readFileSync('./config/selfKey.key'),
//     cert: fs.readFileSync('./config/selfCert.cert')
// }, app)

httpServer.listen(port, function() {
  console.log(
    `=========== HTTP Server started @port ${port} successfully ==========`
  );
});

// httpsServer.listen(httpsPort, function () {
//     console.log(`========== HTTPS Server started @port ${httpsPort} successfully ==========`)
// })

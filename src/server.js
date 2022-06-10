"use strict";

const exprees = require("express");
const errorHandler = require("./error-handler/500");
const notFound = require("./error-handler/404");
const routes = require("./auth/routes/routes");
const sellerRouter = require("./auth/routes/sellerRouter");
const shopperRouter = require("../src/auth/routes/shopperRouter");

const app = exprees();
const cors = require("cors");
const http = require("http");
app.use(cors());
const server = http.createServer(app);

app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));
app.use(routes);
app.use(sellerRouter);
app.use(shopperRouter);



app.get("/", (req, res) => {
  res.send("Welcome to home  🥶🔧👿");
});

// start port
const start = (port) => {
  server.listen(port, () => {
    console.log("The server is started running at port", port);
  });
};



// use middleware
app.use(notFound);
app.use(errorHandler);

// exporting


module.exports = {
  app: server,
  start: start,
};
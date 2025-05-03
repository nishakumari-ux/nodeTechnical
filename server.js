const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const router = express.Router();
const port = 3000;
const TaskRouter = require("./router/task");
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json());
require("./db/connection");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

app.use(router);
app.use('/v1', TaskRouter);

server.listen(() => console.log("server is running on", port))
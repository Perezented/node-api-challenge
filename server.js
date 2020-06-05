const express = require("express");

const projectsRouter = require("./Pages/Projects");
const actionsRouter = require("./Pages/Actions");
const server = express();

var morgan = require("morgan");

server.use(morgan("combined"));
server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);
server.get("/", (req, res) => {
    res.status(200).json({
        port: process.env.PORT,
        message: "Hey there welcome to the slash page of this sprint!",
    });
});

module.exports = server;

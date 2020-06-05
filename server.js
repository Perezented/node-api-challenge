const express = require("express");

const server = express();

const morgan = require("morgan");
server.use(morgan("combined"));

server.get("/", (req, res) => {
    res.status(200).json({
        port: process.env.PORT,
        message: "Hey there welcome to the slash page of this sprint!",
    });
});

module.exports = server;

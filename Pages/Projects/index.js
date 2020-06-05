const express = require("express");

const router = express.Router();

const Projects = require("../../data/helpers/projectModel");

router.get("/", (req, res) => {
    Projects.get().then((projects) => {
        res.status(200).json(projects);
    });
});

module.exports = router;

const express = require("express");

const router = express.Router();

const Projects = require("../../data/helpers/projectModel");

function validateProject(req, res, next) {
    if (req.body.name || req.body.description) {
        next();
    } else res.status(400).json({ error: "Missing name or description" });
}

router.get("/", (req, res) => {
    Projects.get().then((projects) => {
        res.status(200).json(projects);
    });
});

router.get("/:id/actions", (req, res) => {
    Projects.getProjectActions(req.params.id).then((project) => {
        res.status(200).json(project);
    });
});

router.post("/", validateProject, (req, res) => {
    Projects.insert(req.body).then(res.status(203).json(req.body));
});

module.exports = router;

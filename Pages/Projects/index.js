const express = require("express");

const router = express.Router();

const Projects = require("../../data/helpers/projectModel");

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ error: "Missing name or description" });
    } else next();
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

router.delete("/:id", (req, res) => {
    Projects.remove(req.params.id).then((number) => {
        res.status(204).json(number);
    });
});

router.put("/:id", validateProject, (req, res) => {
    req.body.id = req.params.id;
    Projects.update(req.params.id, req.body).then(
        res.status(203).json(req.body)
    );
});

module.exports = router;

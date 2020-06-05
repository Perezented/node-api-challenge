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
router.get("/:id", (req, res) => {
    Projects.get().then((value) => {
        value.map((value) => {
            console.log(value.id);
            if (value.id == req.params.id) {
                res.status(200).json(value);
            }
        });
    });
});
router.get("/:id/actions", (req, res) => {
    Projects.getProjectActions(req.params.id).then((project) => {
        if (project.length === 0) {
            res.status(404).json({ error: "Specified project does not exist" });
        } else res.status(200).json(project);
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

    // Projects.get().then(projects)
    Projects.update(req.params.id, req.body).then(
        res.status(203).json(req.body)
    );
});

module.exports = router;

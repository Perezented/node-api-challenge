const express = require("express");

const router = express.Router();

const Actions = require("../../data/helpers/actionModel");
const Projects = require("../../data/helpers/projectModel");

router.get("/", (req, res) => {
    Actions.get().then((actions) => {
        res.status(200).json(actions);
    });
});

function validateItsThere(req, res, next) {}

function validateAction(req, res, next) {
    if (!req.body.description || !req.body.notes || !req.body.project_id) {
        res.status(400).json({
            error: "Description, Notes, and Project Id is required",
        });
    } else if (req.body.description.length > "128") {
        res.status(400).json({ error: "Description max length of 128" });
    } else next();
}

router.post("/", validateAction, (req, res) => {
    Actions.insert(req.body).then(res.status(203).json(req.body));
});

router.put("/:id", validateAction, (req, res) => {
    req.body.id = req.params.id;
    Actions.update(req.params.id, req.body).then(
        res.status(203).json(req.body)
    );
});

router.delete("/:id", (req, res) => {
    Actions.remove(req.params.id).then((number) => {
        res.status(204).json(number);
    });
});

module.exports = router;

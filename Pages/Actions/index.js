const express = require("express");

const router = express.Router();

const Actions = require("../../data/helpers/actionModel");

router.get("/", (req, res) => {
    Actions.get().then((actions) => {
        res.status(200).json(actions);
    });
});

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

module.exports = router;

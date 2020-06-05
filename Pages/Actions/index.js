const express = require("express");

const router = express.Router();

const Actions = require("../../data/helpers/actionModel");

router.get("/", (req, res) => {
    Actions.get().then((actions) => {
        res.status(200).json(actions);
    });
});

module.exports = router;

const express = require("express"),
    router = express.Router(),
    ParksModel = require("../models/parks");

/* GET home page. */
router.get("/", async (req, res, next) => {
    const parkList = await ParksModel.getAll();
    console.log('session', req.session);

    res.status(200).json(parkList);
});

router.get("/:park_id", async (req, res, next) => {
    const { park_id } = req.params;
    const thePark = await ParksModel.getById(park_id);

    res.render("template", {
        locals: {
            title: "This is one park",
            parkData: thePark,
            isLoggedIn: req.session.is_logged_in,
            firstName: req.session.first_name
        },
        partials: {
            partial: "partial-single-park"
        }
    });
});

module.exports = router;

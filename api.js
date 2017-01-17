var express = require("express");
var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var _ = require("lodash");
var uuid = require("node-uuid");

var router = express.Router();
module.exports = router;

router.get("/rooms", function (req, res) {
    res.json(rooms);
});
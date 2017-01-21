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

router.route("/rooms/:roomid/messages")
    .get(function (req, res) {
        var roomId = req.params.roomid;
        var roomMessage = messages.filter(m => m.roomId === roomId);
        var room = _.find(rooms, r => r.id === roomId);
        console.log(room);
        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.json({
            room: room,
            messages: roomMessage
        });
    })
    .post(function (req, res) {
        var roomId = req.params.roomid;
        var message = {
            roomId: roomId,
            text: req.body.text,
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
            id :uuid.v4()
        };
        messages.push(message);
        //res.sendStatus(200);
        res.json(messages);
    })
    .delete(function (req,res) {
        var roomId = req.params.roomid;
        messages = messages.filter(m => m.roomId !==roomId);
        res.sendStatus(200);
    })


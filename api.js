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

router.get("/rooms/:roomid/messages",function (req,res) {
    var roomId = req.params.roomid;
    var roomMessage = messages.filter(m => m.roomId === roomId);
    var room = _.find(rooms, r => r.id === roomId);
    console.log(room);
    if(!room){
        res.sendStatus(404);
        return;
    }

    res.json({
        room:room,
        messages:roomMessage
    });
});
/**
 * Created by saiful on 1/12/17.
 */
var _ = require("lodash"),
    uuid = require("node-uuid"),
    rooms = require("./data/rooms.json"),
    express = require("express");
var router = express.Router();
module.exports = router;

router.get("/rooms", function (req, res) {
    res.render('room.jade', {
        title: "Admin Rooms",
        rooms: rooms
    });
});
//route to /room/add  where add chat room

router.route("/rooms/add")
    .get(function (req, res) {
        res.render('add.jade');
    })
    //add chatroom to rooms.json
    //redirect to /rooms
    //bodyParser is used to get POST value
    .post(function (req, res) {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room);

        res.redirect(req.baseUrl + "/rooms");
    });

//delete chat room
//get uuid from url
//redirect to /rooms
router.get('/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(p => p.id != roomId);
    res.redirect(req.baseUrl + "/rooms");

});

//edit chatroom
router.route('/rooms/edit/:id')
    .all(function (req,res,next) {
        var roomId = req.params.id;
        var room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }
        res.locals.room = room;
        next();
    })
    .get(function (req, res) {
        res.render("edit.jade");
    })
    .post(function (req, res) {
        res.locals.room.name = req.body.name;
        res.redirect(req.baseUrl + "/rooms");
    });

var express = require("express"),
    app = new express(),
    rooms = require("./data/rooms.json"),
    bodyParser = require("body-parser"),
    uuid = require("node-uuid");


//set jade view folder
app.set("views", "./views");



//set what i use in my view
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({extended: true}));

//default route
app.get("/", function (req, res) {
    res.render('index.jade', {title: "Home"});
});


//route to /admin/rooms
app.get("/admin/rooms", function (req, res) {
    res.render('room.jade', {
        title: "Admin Rooms",
        rooms: rooms
    });
});


//route to /admin/room/add  where add chat room
app.get("/admin/rooms/add", function (req, res) {
    res.render('add.jade');
});


//add chatroom to rooms.json
//redirect to /admin/rooms
//bodyParser is used to get POST value
app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);

    res.redirect("/admin/rooms");
});

//delete chat room
//get uuid from url
//redirect to /admin/rooms
app.get('/admin/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(p => p.id != roomId);
    res.redirect("/admin/rooms");

});

app.listen(3000, function () {
    console.log("running .........");
});
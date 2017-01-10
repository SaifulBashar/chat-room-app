var express = require("express"),
    app = new express(),
    rooms = require("./data/rooms.json"),
    bodyParser = require("body-parser"),
    uuid = require("node-uuid");

app.set("views", "./views");

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.render('index.jade', {title: "Home"});
});

app.get("/admin/rooms", function (req, res) {
    res.render('room.jade', {
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.get("/admin/rooms/add", function (req, res) {
    res.render('add.jade');
});

app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);

    res.redirect("/admin/rooms");
});

app.get('/admin/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(p => p.id != roomId);
    res.redirect("/admin/rooms");

})

app.listen(3000, function () {
    console.log("running .........");
});
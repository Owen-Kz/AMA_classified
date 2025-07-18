const express = require("express")
const db = require("./routes/db.config");
const dotenv = require("dotenv").config();
const app =  express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 31000;
const server = require("http").Server(app)
// const session = require("express-session");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const bodyParser = require("body-parser");
const SaveMessage = require("./controllers/sendMessage");
const useragent = require('express-useragent');

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
})); 
app.use(useragent.express());
app.use(bodyParser.json({ limit: '100mb' })); // For JSON payloads
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookie());
 // For URL-encoded forms
app.use(express.json({ limit: '100mb' })); // For JSON bodies
app.use(express.urlencoded({ limit: '100mb', extended: true })); // For URL-encoded bodies
 


app.set("view engine", "ejs");

app.set("views", ["views", "/views", "./views", "./views/admin", "./views/user", "./views/partials", "./views/pages", "./views/components", "./views/modals", "./views/widgets"]);

app.use("/css", express.static(__dirname + "/public/css", { type: 'text/css' }))
app.use("/js", express.static(__dirname + "/public/js", { type: 'text/javascript' }))
app.use("/vendor", express.static(__dirname + "/public/vendor", {type: 'text/javacript'}))
app.use("/assets", express.static(__dirname + "/public/assets", { type: 'text/folder' }))
app.use("/uploads", express.static(__dirname + "/public/uploads/cover_images/listings", { type: 'text/folder' }))
app.use("/plugins", express.static(__dirname + "/public/plugins", { type: 'text/folder' }))
app.use("/bootstrap", express.static(__dirname + "/public/bootstrap", { type: 'text/folder' }))

const io = require("socket.io")(server, {
    port: 5000 // Change this to your desired port number
})

let socketsConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket) {
  // console.log('Socket connected', socket.id);
  socketsConnected.add(socket.id);
  io.emit('clients-total', socketsConnected.size);
  socket.on('disconnect', () => {
   
    socketsConnected.delete(socket.id); 
    io.emit('clients-total', socketsConnected.size);
  });

  // Generate a unique room ID for this pair of users
  socket.on("join-room", async (roomId) =>{
    socket.join(roomId); // Join the room

  })
  socket.on("message", async (data, roomId) => {
    // io.to(roomId).emit("chat-message", data);

    try {

        // Wait for the message to be saved
        await SaveMessage(data, roomId);
        io.to(roomId).emit("chat-message", data);
        // If the message is saved successfully, emit the event
    } catch (error) {
        console.log("Error saving message:", error);
    }
});




  socket.on("feedback", (data) => {
    socket.broadcast.emit("feedback", data);
  });








}



app.use("/", require("./routes/pages"));

server.listen(PORT); 
console.log("Server is running on", PORT)
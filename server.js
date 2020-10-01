// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var Db = require("./db/db");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Example Note (DATA)
// =============================================================
var notes = [
    {
    title:"Test Title",
    text:"Test text"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
}); 

app.get("/api/notes", function(req, res) {
  //res.sendFile(path.join(__dirname, "./db/db.json"));
  Db.getNotes().then((notes) => {
    res.json(notes);
  }).catch((err) => {
    res.status(500).json(err)
  })
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
}); 

// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  Db.addNote(req.body).then((note) => {
    res.json(note);
  });
});







// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
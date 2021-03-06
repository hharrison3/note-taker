// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var Db = require("./db/db");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// GET Routes
app.get("/notes", function(_req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
}); 

app.get("/api/notes", function(_req, res) {
  Db.getNotes().then((notes) => {
    res.json(notes);
  }).catch((err) => {
    res.status(500).json(err)
  })
});

app.get("*", function(_req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
}); 

// POST Route - Create New Notes
app.post("/api/notes", function(req, res) {
  Db.addNote(req.body).then((note) => {
    res.json(note);
  });
});
// DELETE Route - Delete Notes
app.delete('/api/notes/:id', function (req, res) {
  res.send('Got a DELETE request at /user');
  Db.deleteNote(req.params.id)
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
const fs = require("fs");
const util = require("util");

// const uuidv1 = require("uuid/v1");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Db {
    //read function
    read() {
        return readFileAsync("db/db.json","utf8");
    }
    //write function
    write(note) {
        return writeFileAsync("db/db.json",JSON.stringify(note),"utf8");
    }
    //function that will get notes
    getNotes() {
        return this.read().then((notes) => {
            let parseNotes;

            if (notes.length > 0) {
                parseNotes = JSON.parse(notes);
            } else (
                parseNotes = []
            );
            return parseNotes;
        });
    }
    //add notes function
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
          throw new Error("Note 'title' and 'text' cannot be blank");
        }
        // Add a unique id to the note using uuid package
        // const newNote = { title, text, id: uuidv1() };
        const newNote = { title, text };
        // Get all notes, add the new note, write all the updated notes, return the newNote
        return this.getNotes()
          .then((notes) => [...notes, newNote])
          .then((updatedNotes) => this.write(updatedNotes))
          .then(() => newNote);
    }
    //delete notes funtion
    deleteNote(id) {
        return this.getNotes().then((notes) => {
            const filteredNotes = notes.filter((note) => note.id !== id);
            this.write(filteredNotes);
        })
    }
}

module.exports = new Db();
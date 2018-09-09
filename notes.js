const fs = require('fs');
const moment = require('moment');

var fileName = "notes.json";

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync(fileName);
    return JSON.parse(notesString);
  } catch(e) {
    console.log(`New '${fileName}' file was created`);
    return [];
  }
}

var saveNotes = (notes) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(notes));
    return true;
  } catch(e) {
    return false;
  }
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body,
    created: new Date()
  }
  var duplicateNote = notes.filter((note) => note.title === title);

  if(duplicateNote.length === 0) {
    notes.push(note);
    return saveNotes(notes);
  } else {
    return false;
  }
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);

  if(filteredNotes.length < notes.length) {
    return saveNotes(filteredNotes); 
  } else {
    return false;
  }
}

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
}

var getAll = () => {
  return fetchNotes();
}

var logNote = (note) => {
  console.log('----');
  console.log(`Created: ${moment(note.created).format('MMMM Do YYYY, h:mm:ss a')}`);
  console.log(`  Title: ${note.title}`);
  if (note.body) console.log(`   Body: ${note.body}`);
}

module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll,
  logNote
}
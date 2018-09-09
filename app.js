
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: "Body of note",
  demand: false,
  alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  bodyOptions: bodyOptions
})
.command('read', 'Read a note', {
  title: titleOptions
})
.command('list', 'List all notes')
.command('remove', 'Remove a note', {
  title: titleOptions
})
.help()
.argv;
var command = argv._[0];

switch (command) {
  case 'add':
    var noteAdded = notes.addNote(argv.title, argv.body);
    console.log(noteAdded ? 'Note added' : 'Note already exists');
    break;
  case 'remove':
    var noteRemoved = notes.removeNote(argv.title);
    console.log(noteRemoved ? 'Note removed' : 'Note not found');
    break;
  case 'read':
    var note = notes.getNote(argv.title);
    note ? notes.logNote(note) : console.log('Note not found');
    break;
  case 'list':
    var allNotes = notes.getAll();
    if(allNotes.length > 0) {
      console.log(`Printing ${allNotes.length} note(s):`);
      allNotes.forEach(note => notes.logNote(note));
    } else {
      console.log('No notes found')
    }
    break;
  default: {
    console.log('Add --info for a list of commands')
  }
}
const yargs = require('yargs')
const notes = require('./notes')


//  add command
yargs.command({
    command : 'add' ,
    description : 'Add a note.' ,
    builder : {
        title : {
            description : 'title of the note' ,
            demandOption : true ,
            type : 'string' ,
            alias : 't'
        },
        body : {
            description : 'body of the note' ,
            demandOption : true ,
            type : 'string' ,
            alias : 'b'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//  remove command
yargs.command({
    command : 'remove' ,
    description : 'Remove a note.' ,
    builder : {
        title : {
            description : 'title of the note' ,
            demandOption : true ,
            type : 'string' ,
            alias : 't'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//  list command
yargs.command({
    command : 'list' ,
    description : 'List all notes.' ,
    handler(argv){
        notes.listNotes()
    }
})

//  read command
yargs.command({
    command : 'read' ,
    description : 'Read a note.' ,
    builder : {
        title : {
            description : 'title of the note' ,
            demandOption : true ,
            type : 'string' ,
            alias : 't' 
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})




yargs.parse()
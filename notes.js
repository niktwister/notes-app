const fs = require('fs')
const chalk = require('chalk')


function randomInteger(low,high,...exclude){
    let random
    
    do{
        random = Math.floor( Math.random()*(high-low) + low )
    
    }while(exclude.includes(random))

    return random
}

const style = {
    success : chalk.green.bold.inverse ,
    error : chalk.red.bold.inverse ,
    heading : chalk.bold.inverse ,
    lastUsedColor : -1 ,
    colorList : [   chalk.blue,     chalk.yellow,
                    chalk.green,    chalk.magenta,
                    chalk.red
    ] ,
    random(statement){
        let colorIndex = randomInteger(0,5,this.lastUsedColor)
        this.lastUsedColor = colorIndex
        return this.colorList[colorIndex](statement)
    }
}


function loadNotes(){

    try{
        let dataBuffer = fs.readFileSync('notes.json')
        let dataJSONString = dataBuffer.toString()
        return JSON.parse(dataJSONString)
    }catch(e){
        return []
    }

}

function saveNotes(notes){
    let notesJSONString = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSONString)
}


exports.addNote = (title,body) => {

    let notes = loadNotes()
    let someDuplicate = notes.some((note) => note.title===title)

    if(!someDuplicate){
        notes.push({
            title ,
            body
        })
        saveNotes(notes)
        console.log(style.success('Note added.'))
    }else{
        console.log(style.error('Note already taken !!'))
    }

}


exports.removeNote = (title) => {

    let notes = loadNotes()

    notesToKeep = notes.filter((note) => note.title!==title)

    if(notesToKeep.length !== notes.length){
        saveNotes(notesToKeep)
        console.log(style.success('Note removed.'))
    }else
        console.log(style.error('Note doesn\'t exist !!'))
}


exports.listNotes = () => {

    let notes = loadNotes()

    if(notes.length === 0)
        console.log(style.error('No notes available !!'))
    else{
        console.log(style.heading('Notes'))
        notes.forEach((note) => console.log(style.random('* ' + note.title)))
    }
}


exports.readNote = (title) => {
    
    let notes = loadNotes()

    let note = notes.find((note) => note.title===title)

    if(note){
        console.log(style.heading(note.title))
        console.log(style.random(note.body))
    }else
        console.log(style.error('Note not found !!'))

}
























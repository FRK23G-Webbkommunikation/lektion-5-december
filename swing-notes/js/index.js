import { db } from './firebaseConfig.js';
import { 
    addDoc, collection, getDocs, 
    where, query, deleteDoc,
    doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const postNoteButton = document.querySelector('#postNotesButton');
const getNoteButton = document.querySelector('#getNotesButton');
const notesElem = document.querySelector('#notes');

async function postNote(note) {
    try {
        await addDoc(collection(db, 'notes'), note)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function getNotes(username) {
    try {
        const queryUsername = query(collection(db, 'notes'), where('username', '==', username));
        const notes = await getDocs(queryUsername);

        const formatedNotes = [];

        notes.forEach((note) => {
            const formatedNote = {
                id: note.id,
                note: note.data()
            }

            formatedNotes.push(formatedNote);
        });

        return formatedNotes;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function deleteNote(id) {
    try {
        await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function updateNote(noteText, id) {
    try {
        await updateDoc(doc(db, 'notes', id), {
            note: noteText
        })
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
    
}

function createNoteElement(note) {
    console.log(note);
    const containerElem = document.createElement('article');
    const headingElem = document.createElement('h3');
    const textElem = document.createElement('p');
    const removeButton = document.createElement('button');
    const updateInput = document.createElement('input');
    const updateButton = document.createElement('button');

    headingElem.innerText = note.note.title;
    textElem.innerText = note.note.note;
    removeButton.innerText = 'Ta bort';
    updateButton.innerText = 'Uppdatera';

    containerElem.append(headingElem);
    containerElem.append(textElem);
    containerElem.append(removeButton);
    containerElem.append(updateInput);
    containerElem.append(updateButton);
    notesElem.append(containerElem);

    removeButton.addEventListener('click', () => {
        const noteId = note.id;
        deleteNote(noteId);
    });

    updateButton.addEventListener('click', () => {
        const noteText = updateInput.value;
        const noteId = note.id;

        updateNote(noteText, noteId);
    });
}

function displayNotes(notes) {
    for(const note of notes) {
        createNoteElement(note);
    }
}

getNoteButton.addEventListener('click', async () => {
    const username = document.querySelector('#username').value;

    const notes = await getNotes(username);
    displayNotes(notes);
});


postNoteButton.addEventListener('click', () => {
    const note = {
        username: document.querySelector('#usernamePost').value,
        title: document.querySelector('#title').value,
        note: document.querySelector('#note').value,
        createdAt: new Date().toLocaleDateString()
      }

      postNote(note);
});


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
        // Skapar en ny note i databasen där man skickar med i vilken collection den ska skapas samt vilka fält som ska finnas med

        await addDoc(collection(db, 'notes'), note)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function getNotes(username) {
    try {
        // Här bygger vi upp en fråga till vår databas, först bestämmer vi i vilken collection vi vill söka i collection(db, 'highscore')
        // Sen vad vi ska söka efter och detta fall efter ett specifikt användarnamn where('username', '==', username);
        // Till sist utför vi frågan mot databasen await getDocs(queryUsername);

        const queryUsername = query(collection(db, 'notes'), where('username', '==', username));
        const notes = await getDocs(queryUsername);

        const formatedNotes = []; // Variabel för att spara datan från firestore

        notes.forEach((note) => {
            const formatedNote = { // Bygger upp ett objekt som innehåller både fälten i dokumentet samt dokumentets id
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
        // Tar bort ett dokument baserat på dokumentets id i collection notes

        await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

async function updateNote(noteText, id) {
    try {
        // Uppdaterar ett dokument baserat på dokumentets id i collection notes, skickar med ett objekt med de fält man vill uppdatera

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


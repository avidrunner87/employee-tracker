const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));

// Return index.html page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))

);

// Return notes.html page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Return JSON list of all notes notes in the db.json file
app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.log('----------');
    console.log('Time:', Date(Date.now()).toString());
    console.log('Method:', req.method);
    console.log('URL Path:', req.originalUrl);
    console.log('Description:', 'Request for all notes in database');
    // Obtain existing notes
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert string into JSON object
            let parsedNotes = JSON.parse(data);
            console.log(parsedNotes);
            res.json(parsedNotes);
            return;
        }
    });
});

// Create a new note in the db.json file
app.post('/api/notes', (req, res) => {
    const noteId = req.body.id;

    // Log our request to the terminal
    console.log('----------');
    console.log('Time:', Date(Date.now()).toString());
    console.log('Method:', req.method);
    console.log('URL Path:', req.originalUrl);
    console.log('Description:', 'Request for all notes in database');
    console.log('Body', req.body);

    // Obtain existing notes
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert string into JSON object
            let parsedNotes = JSON.parse(data);

            // Remove the deleted note from the database
            const noteIndex = parsedNotes.findIndex(note => (note.id == noteId));
            if (noteIndex !== -1) {
                parsedNotes.splice(noteIndex, 1);
            }

            parsedNotes.push(req.body);
            console.log(parsedNotes);

            // Write updated notes back to the file
            fs.writeFile(
                './db/notes.json',
                JSON.stringify(parsedNotes),
                (writeErr) => {
                    writeErr
                    ? console.error(writeErr)
                    : console.log('Successfully updated notes!');
                    res.json(`Note with ID ${noteId} has been successfully updated`);
                    return;
                }
            );
        }
    });
});

// Delete a note in the db.json file
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    // Log our request to the terminal
    console.log('----------');
    console.log('Time:', Date(Date.now()).toString());
    console.log('Method:', req.method);
    console.log('URL Path:', req.originalUrl);
    console.log('Description:', `Delete request received for note with ID ${req.params.id}`);

    // Obtain existing notes
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert string into JSON object
            let parsedNotes = JSON.parse(data);

            // Remove the deleted note from the database
            const noteIndex = parsedNotes.findIndex(note => (note.id == noteId));
            console.log(noteIndex);
            if (noteIndex !== -1) {
                parsedNotes.splice(noteIndex, 1);
            }

            console.log(parsedNotes);

            // Write updated notes back to the file
            fs.writeFile(
                './db/notes.json',
                JSON.stringify(parsedNotes),
                (writeErr) => {
                    writeErr
                    ? console.error(writeErr)
                    : console.log('Successfully updated notes!');
                    res.json(`Note with ID ${noteId} has been successfully deleted`);
                    return;
                }
            );
        }
    });
});

app.listen(PORT, () => {
    console.log(`Express is working on port ${PORT}`);
});
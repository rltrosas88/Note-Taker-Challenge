const fs = require('fs');
const { notes } = require('../../db/db.json')
const router = require('express').Router();

// function writeToDb(notes) {
//     notes = JSON.stringify(notes);
//     console.log(notes);
//     fs.writeFileSync("../../db/db.json", notes, function(err) {
//       if (err) {
//         return console.log(err);
//       }
//     });
//   }

function filterByQuery(query,notesArray) {
  let filterdResults = notesArray;
  console.log("query", query)
  if (query) {
    filteredResults = filteredResults.filter((note) => note.id !== query);
  }
  return filterdResults;
};

function create(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notesArray),
  );
  return note;
};

function validate(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
};

function deleteNotes(newNotesArray) {
  fs.writeFileSync (
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(newNotesArray)
  );
  return newNotesArray;
};

router.get('/api/notes', (req, res) => {
  let results = notes;  
  //console.log(req.query);
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validate(req.body)) {
      res.status(400).send('Not properly formatted.');
    } else {
      const note = create(req.body, notes);
    res.json(req.body);
    }
  });

router.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = deleteNotes(filterByQuery(id, notes))
  res.json(notes)
});

  module.exports = router;
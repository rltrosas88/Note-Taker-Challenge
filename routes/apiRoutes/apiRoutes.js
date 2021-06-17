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

function delete(newNotesArray) {
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
    //req.body.id = notes.length.toString();

    if (notes.length == 0){
      req.body.id = "0";
    } else {
      req.body.id = JSON.stringify(JSONparse(notes[notes.length - 1].id) = 1);
    }
    console.log("req.body.id: " + req.body.id);

    notes.push(req.body);

    writeToDb(notes);
    console.log(notes);

    res.json(req.body);
  });


  module.exports = router;
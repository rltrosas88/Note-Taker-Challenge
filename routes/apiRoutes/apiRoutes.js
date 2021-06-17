const fs = require('fs');
const { notes } = require('../../db/db.json')
const router = require('express').Router();
const { filterByQuery, create, validate, deleteNotes } = require('../../lib/notes');

// function writeToDb(notes) {
//     notes = JSON.stringify(notes);
//     console.log(notes);
//     fs.writeFileSync("../../db/db.json", notes, function(err) {
//       if (err) {
//         return console.log(err);
//       }
//     });
//   }

router.get('/api/notes', (req, res) => {
  let results = notes;  
  //console.log(req.query);
    res.json(results);
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
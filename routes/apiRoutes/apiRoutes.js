const fs = require('fs');
const { notes } = require('../../db/db.json')
const router = require('express').Router();

function writeToDb(notes) {
    notes = JSON.stringify(notes);
    console.log(notes);
    fs.writeFileSync("../../db/db.json", notes, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

router.get('/api/notes', (req, res) => {
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


router.delete('api/notes/:id', (req, res) => {
    let id = req.params.id.toString();
    console.log(id);

    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id == id) {
        console.log("match");
        res.send(notes[i]);
        notes.splice(i, 1);
        break;
      }
    }
    writeToDb(notes);
});

  module.exports = router;
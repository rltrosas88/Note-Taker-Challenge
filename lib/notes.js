const fs = require('fs');
const path = require('path');

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

  module.exports = {
      filterByQuery,
      create,
      validate,
      deleteNotes
  }
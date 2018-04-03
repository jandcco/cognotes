const express = require("express");
const router = express.Router();

const {getNotes, createNote, deleteNote, updateNote} = require("./Controllers/note")

router.post("/note", createNote);

router.get("/", (req, res) => {
  res.send("Woo");
});

module.exports = router;

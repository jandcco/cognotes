const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Woo");
})

module.exports = router;
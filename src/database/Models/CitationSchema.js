const {Schema} = require("mongoose");

const CitationSchema = new Schema({
  caption: {
    type: String
  },
  url: {
    type: String
  },
  publication: {
    type: String
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

module.exports = CitationSchema;

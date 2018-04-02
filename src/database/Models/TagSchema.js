const {Schema} = require("mongoose");

const TagSchema = new Schema({
  text: {
    type:String,
    required: true,
    unique: true
  },
  notes: {
    type: [Schema.Types.ObjectId],
    ref: "NoteSchema"
  }
})

module.exports = TagSchema;

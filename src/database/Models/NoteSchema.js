const {Schema} = require("mongoose");

const NoteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  owner: {
    type: UserSchema
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: "TagSchema"
  }
})

module.exports = NoteSchema;
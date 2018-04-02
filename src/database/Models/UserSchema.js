const {Schema} = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: {
    type: [Schema.Types.ObjectId],
    ref: "NoteSchema"
  }
});

module.exports = UserSchema;
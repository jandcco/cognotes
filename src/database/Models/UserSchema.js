const {Schema} = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  notes: {
    type: [Schema.Types.ObjectId],
    ref: "NoteSchema"
  }
});

module.exports = UserSchema;

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
    ref: "Tag"
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  modifiedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

/**
 * Method to return the tags of the note. (As opposed to the ids of the tags)
 * @return {array}
 */
NoteSchema.methods.getTags(err, function (){
  return this.populate("tags")
})

module.exports = NoteSchema;

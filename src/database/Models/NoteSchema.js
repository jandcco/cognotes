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
    type: Schema.Types.ObjectId,
    ref: "User"
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
NoteSchema.methods.getTags = function (){
  return this.populate("tags")
};

NoteSchema.methods.addTag = function(tagId) {
  let index = this.tags.indexOf(tagId);
  // don't add dupe tags
  if (index < 0) {
    this.tags.push(tagId);
  }
};

NoteSchema.methods.removeTag = function(tagId) {
  let index = this.tags.indexOf(tagId);
  if (index >= 0) {
    this.tags.splice(index, 1);
  }
};

module.exports = NoteSchema;

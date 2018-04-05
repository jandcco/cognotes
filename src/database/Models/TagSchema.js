const {Schema} = require("mongoose");

const TagSchema = new Schema({
  text: {
    type:String,
    required: true,
    unique: true
  },
  notes: {
    type: [Schema.Types.ObjectId],
    ref: "Note"
  },
  notesCounter: {
    type: Number,
    required: true
  }
})

/**
 * Returns the most popular 20 tags, in descending order
 * @return {array}
 */
TagSchema.static.mostUsed = function (){
  return this.where('notesCounter').gt(1).sort(-1).limit(20)
};

TagSchema.methods.addNote = function(noteId) {
  this.notes.push(noteId);
  this.notesCounter += 1;
};

TagSchema.methods.removeNote = function(noteId) {
  let index = this.notes.indexOf(noteId);
  if (index >= 0) {
    this.notes.splice(index, 1);
    this.notesCounter -= 1;
  }
};
module.exports = TagSchema;

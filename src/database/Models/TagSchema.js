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

module.exports = TagSchema;

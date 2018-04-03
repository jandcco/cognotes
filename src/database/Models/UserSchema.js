const {Schema} = require("mongoose");
const bcrypt = require("bcrypt")

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
  displayName: {
    type: String,
    required: true
  },
  notes: {
    type: [Schema.Types.ObjectId],
    ref: "Note"
  },
  superuser:{
    type: Boolean,
    required: true
  }
});

/**
 * Verify that a given password is correct for this user.
 * @param  {String} enteredPassword password to check
 * @return {Promise} - resolves to true if password is correct,
 *                      false otherwise
 */
UserSchema.methods.verifyPassword(err, function (enteredPassword){
  return bcrypt.compare(enteredPassword, this.password);
});

module.exports = UserSchema;

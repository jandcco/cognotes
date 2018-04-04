// const db = require("../../src/database/client")();

const { Citation, Group, User, Tag, Note } = require("../../src/database/Models");

module.exports = async () => {
  await Citation.remove();
  await Group.remove();
  await User.remove();
  await Tag.remove();
  await Note.remove();
};

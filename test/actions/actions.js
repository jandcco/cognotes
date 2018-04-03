const { expect } = require("chai");
require("../../src/database/client")();
const resetDb = require("../utilities/resetDb");

const CreateUser = require("../../src/database/Actions/CreateUser");
const CreateNote = require("../../src/database/Actions/CreateNote");
const CreateCitation = require("../../src/database/Actions/CreateCitation");
const UpdateCitation = require("../../src/database/Actions/UpdateCitation");


const user_props = { username: "tester", password: "testpassword" };
const note_props = { text: "contents of note go here", title: "this is the name of my note"};
describe("CreateUser", function () {
  beforeEach(async () => {
    resetDb();
  });

  it("creates a new user with a name", async () => {
    const newUser = await CreateUser(user_props.username, user_props.password);
    expect(newUser.displayName).to.equal(user_props.username);
  });
});

describe("CreateNote", function () {
  let userId;
  beforeEach(async () => {
    resetDb();
    const newUser = await CreateUser(user_props.username, user_props.password);
    userId = newUser._id;
  });

  it("creates a new note with a property", async () => {
    const newNote = await CreateNote(userId, note_props.text, note_props.title);
    expect(newNote.title).to.equal(note_props.title);
  });
});

describe("CreateCitation", function () {
  let note;
  beforeEach(async () => {
    resetDb();
    const newUser = await CreateUser(user_props.username, user_props.password);
    const newNote = await CreateNote(newUser._id, note_props.text, note_props.title);
    note = newNote;
  });

  it("creates a new citation with a property", async () => {
    const newCitation = await CreateCitation(note_props._id, "wikipedia", "wiki", "the internet");
    expect(newCitation.caption).to.equal("wiki");
  });
});

describe("UpdateCitation", function () {
  let note;
  beforeEach(async () => {
    resetDb();
    const newUser = await CreateUser(user_props.username, user_props.password);
    const newNote = await CreateNote(newUser._id, note_props.text, note_props.title);
    note = newNote;
  });

  it("updates a citation", async () => {
    const newCitation = await CreateCitation(note_props._id, "wikipedia", "wiki", "the internet");
    const updatedCitation = await UpdateCitation(newCitation, "wikipedia", "new caption here", "the internet");
    expect(updatedCitation.caption).to.equal("new caption here");
  });
});

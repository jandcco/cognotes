const { expect } = require("chai");
require("../../src/database/client")();
const resetDb = require("../utilities/resetDb");

const CreateUser = require("../../src/database/Actions/CreateUser");
const CreateNote = require("../../src/database/Actions/CreateNote");
const CreateCitation = require("../../src/database/Actions/CreateCitation");
const UpdateCitation = require("../../src/database/Actions/UpdateCitation");



describe("CreateUser", function () {
  beforeEach(async () => {
    resetDb();
  });

  it("creates a new user with a name", async () => {
    const newUser = await CreateUser("testy", "test");
    expect(newUser.displayName).to.equal("testy");
  });
});

describe("CreateNote", function () {
  let userId;
  beforeEach(async () => {
    resetDb();
    const newUser = await CreateUser("name", "password");
    userId = newUser._id;
  });

  it("creates a new note with a property", async () => {
    const newNote = await CreateNote(userId, "contents of note here", "F111rst note");
    expect(newNote.title).to.equal("F111rst note");
  });
});

describe("CreateCitation", function () {
  let note;
  beforeEach(async () => {
    resetDb();
    const newUser = await CreateUser("name", "password");
    const newNote = await CreateNote(newUser._id, "contents of note here", "F111rst note");
    note = newNote;
  });

  it("creates a new citation with a property", async () => {
    const newCitation = await CreateCitation(note._id, "wikipedia", "wiki", "the internet");
    expect(newCitation.caption).to.equal("wiki");
  });
});

describe("UpdateCitation", function () {
  let note;
  beforeEach(async () => {
    resetDb();
    const newUser = await CreateUser("name", "password");
    const newNote = await CreateNote(newUser._id, "contents of note here", "F111rst note");
    note = newNote;
  });

  it("updates a citation", async () => {
    const newCitation = await CreateCitation(note._id, "wikipedia", "wiki", "the internet");
    const updatedCitation = await UpdateCitation(newCitation, "wikipedia", "new caption here", "the internet");
    expect(updatedCitation.caption).to.equal("new caption here");
  });
});

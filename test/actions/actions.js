const { expect } = require("chai")
require("../../src/database/client")();
const resetDb = require("../utilities/resetDb")

const CreateUser = require("../../src/database/Actions/CreateUser")

describe('add new user', async function () {
  beforeEach(async () => {
    resetDb();
  });

  it('creates a new user with a name', async () => {
    const newUser = await CreateUser('testy', 'test');
    expect(newUser.displayName).to.equal('testy');
  })

});

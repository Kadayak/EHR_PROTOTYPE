const helpers = require("../src/dist/utils/helpers");

// this fails because we have a javascript file testing typescript functions.

// https://jestjs.io/docs/getting-started#using-typescript

describe("Testing helpers", () => {
  describe("- isValidDate", () => {
    test("01/01/2000 returns TRUE", async () => {
      expect(helpers.isValidDate("01/01/2000")).toEqual(true);
    });
  });
});

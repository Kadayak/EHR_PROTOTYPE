const request = require("supertest"); // so that we can test through http.

const PORT = 3001;

const URL = `http://localhost:${PORT}`;

describe("testing tests", () => {
  const PATH = "/";
  test("/ returns 'hello world'", async () => {
    const res = await request(URL).get(PATH);

    // does the response give me the correct status code?
    expect(res).toHaveProperty("statusCode", 200);
    expect(res).toHaveProperty("body");
    expect(res.body.hello).toBe("World!");
  });
});

const request = require("supertest"); // so that we can test through http.

const PORT = 3001;

const URL = `http://localhost:${PORT}`;

describe("/patients", () => {
  const PATH = "/api/patients";
  describe("POST", () => {
    test("empty body fails", async () => {
      const res = await request(URL).post(PATH).send({}); // without body == empty body

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "Body has to include firstName, lastName and birthDate"
      );
    });

    test("body without any attribute fails", async () => {
      // this body is without birthDate.
      const body = {
        firstName: "",
        lastName: "",
      };
      const res = await request(URL).post(PATH).send(body);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "Body has to include firstName, lastName and birthDate"
      );
    });

    test("empty firstName fails", async () => {
      const body = {
        firstName: "",
        lastName: "test",
        birthDate: "test",
      };
      const res = await request(URL).post(PATH).send(body);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "both firstName and lastName have to be non-empty strings"
      );
    });

    test("empty lastName fails", async () => {
      const body = {
        firstName: "test",
        lastName: "",
        birthDate: "test",
      };
      const res = await request(URL).post(PATH).send(body);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "both firstName and lastName have to be non-empty strings"
      );
    });

    test("invalid date fails", async () => {
      const body = {
        firstName: "test",
        lastName: "test",
        birthDate: "",
      };
      const res = await request(URL).post(PATH).send(body);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe("birthDate has to be a valid date");
    });
  });

  describe("GET", () => {
    test("invalid id fails", async () => {
      const id = "invalid-id";
      const res = await request(URL).get(PATH + `/${id}`);

      expect(res).toHaveProperty("statusCode", 400);
    });

    test("non-existing id fails", async () => {
      const id = 999999;
      const res = await request(URL).get(PATH + `/${id}`);

      expect(res).toHaveProperty("statusCode", 404);
    });
  });
});

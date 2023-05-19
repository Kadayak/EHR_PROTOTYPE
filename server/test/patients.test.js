// const { beforeEach } = require("node:test");
const request = require("supertest"); // so that we can test through http.

const PORT = 3001;

const URL = `http://localhost:${PORT}`;

let config;

beforeAll(async () => {
  const response = await request("http://localhost:3001")
    .post("/api/auth/login")
    .send({
      cpr: "0101802020",
      password: "coolPW",
    });

  const { accessToken } = response.body;

  config = {
    Authorization: `Bearer ${accessToken}`,
  };
});

describe("/patients", () => {
  const PATH = "/api/patients";
  describe("POST", () => {
    test("empty body fails", async () => {
      const res = await request(URL).post(PATH).set(config); // without body == empty body

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "Body has to include cpr, firstName, lastName, birthDate and homeDoctorCpr"
      );
    });

    test("empty homeDoctorCpr fails", async () => {
      const body = {
        cpr: "test",
        firstName: "test",
        lastName: "test",
        birthDate: "test",
      };

      const res = await request(URL).post(PATH).send(body).set(config);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "Body has to include cpr, firstName, lastName, birthDate and homeDoctorCpr"
      );
    });

    test("body with incorrect cpr fails", async () => {
      // this body is without birthDate.
      const body = {
        cpr: "test",
        firstName: "test",
        lastName: "test",
        birthDate: "test",
        homeDoctorCpr: "test",
      };
      const res = await request(URL).post(PATH).send(body).set(config);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe("cpr: Cpr must be made up of 10 numbers");
    });

    test("incorrect homeDoctorCpr fails", async () => {
      // this body is without birthDate.
      const body = {
        cpr: "0102030405",
        firstName: "test",
        lastName: "test",
        birthDate: "test",
        homeDoctorCpr: "test",
      };
      const res = await request(URL).post(PATH).send(body).set(config);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe(
        "homeDoctorCpr: Cpr must be made up of 10 numbers"
      );
    });

    test("incorrect birthdate fails", async () => {
      // this body is without birthDate.
      const body = {
        cpr: "0102030405",
        firstName: "test",
        lastName: "test",
        birthDate: "test",
        homeDoctorCpr: "0102030405",
      };
      const res = await request(URL).post(PATH).send(body).set(config);

      expect(res).toHaveProperty("statusCode", 400);
      expect(res.body.message).toBe("birthDate has to be a valid date");
    });

    test("non existant doctor cpr fails", async () => {
      // this body is without birthDate.
      const body = {
        cpr: "0102030405",
        firstName: "test",
        lastName: "test",
        birthDate: "01/01/2000",
        homeDoctorCpr: "0102030405",
      };
      const res = await request(URL).post(PATH).send(body).set(config);

      expect(res).toHaveProperty("statusCode", 404);
      expect(res.body.message).toBe(
        `doctor with cpr: ${body.homeDoctorCpr} not found`
      );
    });

    test("correct input success", async () => {
      // this body is without birthDate.
      const body = {
        cpr: "0102030405",
        firstName: "test",
        lastName: "test",
        birthDate: "01/01/2000",
        homeDoctorCpr: "0101802020",
      };
      const res = await request(URL).post(PATH).send(body).set(config);

      expect(res).toHaveProperty("statusCode", 201);
      expect(res.body.cpr).toEqual(body.cpr);
    });
  });

  describe("GET", () => {
    test("/:id invalid id fails", async () => {
      const id = "invalid-id";
      const res = await request(URL)
        .get(PATH + `/${id}`)
        .set(config);

      expect(res).toHaveProperty("statusCode", 400);
    });

    test("/:id non-existing id fails", async () => {
      const id = "9999999999";
      const res = await request(URL)
        .get(PATH + `/${id}`)
        .set(config);

      expect(res).toHaveProperty("statusCode", 404);
    });
  });
});
